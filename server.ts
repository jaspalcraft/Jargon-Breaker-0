import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { SAMPLE_ANALYSES, generateRuleBasedAnalysis } from './src/data/sampleAnalyses.ts';
import { SAMPLE_ANALYSES_TRANSLATED, LanguageCode } from './src/data/translations.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to find exact or normalized quote location in original document
function findQuoteSpan(docText: string, quote: string): { start: number; end: number; matchedQuote: string } | null {
  if (!quote || !docText) return null;
  const trimmedQuote = quote.trim();
  if (trimmedQuote.length < 5) return null;

  // 1. Direct match
  const directIdx = docText.indexOf(trimmedQuote);
  if (directIdx !== -1) {
    return {
      start: directIdx,
      end: directIdx + trimmedQuote.length,
      matchedQuote: docText.substring(directIdx, directIdx + trimmedQuote.length),
    };
  }

  // 2. Case-insensitive exact match
  const lowerDoc = docText.toLowerCase();
  const lowerQuote = trimmedQuote.toLowerCase();
  const lowerIdx = lowerDoc.indexOf(lowerQuote);
  if (lowerIdx !== -1) {
    return {
      start: lowerIdx,
      end: lowerIdx + trimmedQuote.length,
      matchedQuote: docText.substring(lowerIdx, lowerIdx + trimmedQuote.length),
    };
  }

  // 3. Normalized whitespace match (e.g. collapsed newlines/spaces)
  const normalizedDoc = docText.replace(/\s+/g, ' ');
  const normalizedQuote = trimmedQuote.replace(/\s+/g, ' ');
  const normIdx = normalizedDoc.indexOf(normalizedQuote);
  if (normIdx !== -1) {
    // Map back to original text index approximately
    const prefix = normalizedDoc.substring(0, normIdx);
    const prefixWords = prefix.trim().split(/\s+/).filter(Boolean);
    const quoteWords = normalizedQuote.trim().split(/\s+/).filter(Boolean);
    
    // Find matching start word in original document
    const wordsInDoc = docText.split(/\s+/);
    let matchedWordStart = 0;
    let wordCounter = 0;
    
    for (let i = 0; i < wordsInDoc.length - quoteWords.length + 1; i++) {
      let matches = true;
      for (let j = 0; j < Math.min(4, quoteWords.length); j++) {
        const cleanDocWord = wordsInDoc[i + j]?.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const cleanQuoteWord = quoteWords[j]?.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        if (cleanDocWord !== cleanQuoteWord) {
          matches = false;
          break;
        }
      }
      if (matches) {
        // Find position of this word in docText
        const firstWord = wordsInDoc[i];
        const searchFrom = docText.indexOf(firstWord, matchedWordStart);
        if (searchFrom !== -1) {
          // Approximate length
          const estimatedEnd = Math.min(docText.length, searchFrom + trimmedQuote.length + 20);
          return {
            start: searchFrom,
            end: estimatedEnd,
            matchedQuote: docText.substring(searchFrom, estimatedEnd).trim(),
          };
        }
      }
    }
  }

  return null;
}

app.post('/api/analyze', async (req: Request, res: Response): Promise<void> => {
  try {
    const { documentText, documentTypeFilter, language = 'en' } = req.body;

    if (!documentText || typeof documentText !== 'string' || documentText.trim().length < 20) {
      res.status(400).json({
        error: 'Please paste a document with at least 20 characters to analyze.',
      });
      return;
    }

    // Helper to get translated sample
    const getSampleResponse = (key: string) => {
      const base = SAMPLE_ANALYSES[key];
      if (!base) return null;
      const lang = (language || 'en') as LanguageCode;
      const trans = SAMPLE_ANALYSES_TRANSLATED[lang]?.[key] || {};
      return {
        ...base,
        ...trans,
        characterCount: documentText.length,
        analyzedAt: new Date().toISOString(),
        language: lang,
      };
    };

    // Fast-path: Check for pre-packaged sample documents for instant, robust demo
    if (documentText.includes('742 Evergreen Terrace') || documentText.includes('APEX REALTY HOLDINGS')) {
      const sample = getSampleResponse('rental-agreement');
      if (sample) {
        res.json(sample);
        return;
      }
    } else if (documentText.includes('VALLEY MEMORIAL HEALTH') || documentText.includes('DIAGNOSTIC ARTHROSCOPY')) {
      const sample = getSampleResponse('medical-consent');
      if (sample) {
        res.json(sample);
        return;
      }
    } else if (documentText.includes('DEPARTMENT OF BUILDING & CODE') || documentText.includes('CITY OF METROPOLIS')) {
      const sample = getSampleResponse('government-notice');
      if (sample) {
        res.json(sample);
        return;
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackResult = generateRuleBasedAnalysis(documentText, (language || 'en') as LanguageCode);
      res.json({ ...fallbackResult, language });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const langInstruction =
      language === 'ta'
        ? 'Provide the plainLanguageSummary, riskVerdict, keyTakeaways, riskExplanation, and action recommendations translated into clear Tamil (தமிழ்). Keep the exactQuote in original document language.'
        : language === 'hi'
        ? 'Provide the plainLanguageSummary, riskVerdict, keyTakeaways, riskExplanation, and action recommendations translated into clear Hindi (हिन्दी). Keep the exactQuote in original document language.'
        : 'Provide all summaries and explanations in clear, modern plain English.';

    const systemInstruction = `You are Jargon Breaker, an expert in demystifying complex legal agreements, medical consents, lease terms, and government notices into clear, everyday human language.

CRITICAL INSTRUCTIONS:
${langInstruction}
1. Explain in "plain words": Write a crystal-clear, jargon-free summary (3-4 simple sentences) explaining what this document is really saying, who holds the advantage, what rights the signer gives up, and the main commitments.
2. Risk Score & Verdict: Provide a 'riskScore' integer from 1 to 10 (1 = completely standard/safe, 10 = extremely dangerous/predatory) and a concise one-line 'riskVerdict'.
3. Risky Clauses: Identify clauses with varying severity:
   - 'high' (red, e.g. deposit forfeiture, unlimited entry, unredacted video consent, daily compounding fines)
   - 'amber' (medium, e.g. strict notice windows, mandatory arbitration, unilateral price changes)
   - 'yellow' (low / cautionary advisory, e.g. administrative fees, strict visitor rules)
   - exactQuote MUST be an EXACT, verbatim substring quote from the document text. If not in text, do not invent it.
4. Action Checklist: Generate prioritized actions with:
   - 'triggeredByClause': specific clause citation
   - 'urgency': 'urgent' | 'important' | 'recommended'
   - 'questionToAsk': a ready-to-ask, professional question or negotiation line the user can copy and send directly to their landlord, doctor, or office.
5. Deadlines: Extract any explicit deadlines (e.g. 120 days notice, 7 business days, 10 calendar days).
6. Output valid JSON strictly conforming to schema.`;

    const docTypeHint = documentTypeFilter && documentTypeFilter !== 'auto' ? `Document Category: ${documentTypeFilter}\n` : '';
    const prompt = `${docTypeHint}Analyze the following document:\n\n---\n${documentText.trim()}\n---`;

    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let lastError: any = null;
    let response: any = null;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                documentType: {
                  type: Type.STRING,
                  description: 'e.g. Residential Lease, Medical Consent, City Enforcement Citation',
                },
                overallRiskLevel: {
                  type: Type.STRING,
                  enum: ['low', 'moderate', 'high'],
                },
                riskScore: {
                  type: Type.INTEGER,
                  description: 'Score from 1 (safe) to 10 (extremely risky)',
                },
                riskVerdict: {
                  type: Type.STRING,
                  description: 'One-line verdict e.g. "Severe Landlord Tilt — Negotiate Section 3 Before Signing"',
                },
                plainLanguageSummary: {
                  type: Type.STRING,
                  description: '3-4 simple, crystal clear sentences',
                },
                keyTakeaways: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                deadlines: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      title: { type: Type.STRING },
                      timeframe: { type: Type.STRING },
                      exactTrigger: { type: Type.STRING },
                      consequenceIfMissed: { type: Type.STRING },
                    },
                    required: ['title', 'timeframe', 'consequenceIfMissed'],
                  },
                },
                riskyClauses: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      exactQuote: {
                        type: Type.STRING,
                        description: 'CRITICAL: Must be an EXACT, verbatim substring quote from the document.',
                      },
                      severity: {
                        type: Type.STRING,
                        enum: ['high', 'amber', 'yellow'],
                      },
                      category: { type: Type.STRING },
                      riskExplanation: { type: Type.STRING },
                      recommendedAction: { type: Type.STRING },
                      potentialTrap: { type: Type.STRING },
                    },
                    required: ['exactQuote', 'severity', 'category', 'riskExplanation', 'recommendedAction'],
                  },
                },
                actionChecklist: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      action: { type: Type.STRING },
                      triggeredByClause: { type: Type.STRING },
                      urgency: {
                        type: Type.STRING,
                        enum: ['urgent', 'important', 'recommended'],
                      },
                      category: { type: Type.STRING },
                      questionToAsk: {
                        type: Type.STRING,
                        description: 'Ready-to-ask line to send to landlord/doctor/office',
                      },
                    },
                    required: ['action', 'triggeredByClause', 'urgency', 'questionToAsk'],
                  },
                },
                glossary: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      term: { type: Type.STRING },
                      plainMeaning: { type: Type.STRING },
                    },
                    required: ['term', 'plainMeaning'],
                  },
                },
              },
              required: [
                'documentType',
                'overallRiskLevel',
                'riskScore',
                'riskVerdict',
                'plainLanguageSummary',
                'keyTakeaways',
                'riskyClauses',
                'actionChecklist',
              ],
            },
          },
        });
        if (response && response.text) {
          break;
        }
      } catch (callErr: any) {
        lastError = callErr;
        const errMsg = callErr?.message || String(callErr);
        console.warn(`Gemini API model ${modelName} call failed: ${errMsg}`);
        if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
          continue;
        }
      }
    }

    if (!response || !response.text) {
      console.warn('All Gemini models exhausted. Serving intelligent fallback analysis.');
      const fallback = generateRuleBasedAnalysis(documentText, (language || 'en') as LanguageCode);
      res.json({ ...fallback, language });
      return;
    }

    const responseText = response.text || '{}';
    let parsedData: any;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response JSON:', responseText);
      const fallback = generateRuleBasedAnalysis(documentText, (language || 'en') as LanguageCode);
      res.json({ ...fallback, language });
      return;
    }

    // Filter clauses and verify exact quote match in original document text
    const validClauses: any[] = [];
    const rawClauses = Array.isArray(parsedData.riskyClauses) ? parsedData.riskyClauses : [];

    rawClauses.forEach((clause: any, index: number) => {
      if (!clause.exactQuote) return;
      const span = findQuoteSpan(documentText, clause.exactQuote);
      if (span) {
        validClauses.push({
          ...clause,
          id: clause.id || `clause-${index + 1}`,
          exactQuote: span.matchedQuote,
          startIndex: span.start,
          endIndex: span.end,
        });
      } else {
        console.log(`Skipping clause quote not found in text: "${clause.exactQuote?.slice(0, 50)}..."`);
      }
    });

    const actionChecklist = (parsedData.actionChecklist || []).map((item: any, idx: number) => ({
      ...item,
      id: item.id || `action-${idx + 1}`,
      clauseIdRef: validClauses[idx]?.id,
    }));

    const result = {
      documentType: parsedData.documentType || 'Legal/Administrative Document',
      overallRiskLevel: parsedData.overallRiskLevel || (validClauses.some((c) => c.severity === 'high') ? 'high' : 'moderate'),
      riskScore: parsedData.riskScore || (validClauses.some((c) => c.severity === 'high') ? 8 : 5),
      riskVerdict: parsedData.riskVerdict || (validClauses.some((c) => c.severity === 'high') ? 'Significant Risky Clauses Present — Negotiate Before Agreeing' : 'Standard Document Terms'),
      plainLanguageSummary: parsedData.plainLanguageSummary || 'No summary generated.',
      keyTakeaways: parsedData.keyTakeaways || [],
      riskyClauses: validClauses,
      actionChecklist,
      deadlines: parsedData.deadlines || [],
      glossary: parsedData.glossary || [],
      analyzedAt: new Date().toISOString(),
      characterCount: documentText.length,
      matchedClausesCount: validClauses.length,
      language,
    };

    res.json(result);
  } catch (err: any) {
    console.error('Error during document analysis:', err);
    res.status(500).json({
      error: err?.message || 'An unexpected error occurred while analyzing the document.',
    });
  }
});

// Chat with Document Endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { documentText, question, language = 'en' } = req.body;

    if (!documentText || !question) {
      res.status(400).json({ error: 'documentText and question are required.' });
      return;
    }

    const notMentionedText =
      language === 'hi'
        ? 'इस दस्तावेज़ में इसका उल्लेख नहीं है।'
        : language === 'ta'
        ? 'இந்த ஆவணத்தில் இது குறிப்பிடப்படவில்லை.'
        : 'Not mentioned in this document.';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback search in documentText
      const qLower = question.toLowerCase();
      const words = qLower.split(/\s+/).filter((w: string) => w.length > 3);
      const sentences = documentText.split(/[.?!]\s+/);
      const matchingSentence = sentences.find((s: string) =>
        words.some((w: string) => s.toLowerCase().includes(w))
      );

      if (matchingSentence) {
        const prefix =
          language === 'hi'
            ? 'दस्तावेज़ के अनुसार: '
            : language === 'ta'
            ? 'ஆவணத்தின்படி: '
            : 'According to the document: ';
        res.json({
          answer: `${prefix}${matchingSentence.trim()}`,
          sourceQuote: matchingSentence.trim(),
          sourceClause: language === 'hi' ? 'संदर्भित क्लॉज' : language === 'ta' ? 'குறிப்பிடப்பட்ட விதி' : 'Referenced Clause',
          notMentioned: false,
        });
      } else {
        res.json({
          answer: notMentionedText,
          notMentioned: true,
        });
      }
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const langRule =
      language === 'ta'
        ? 'Provide the answer strictly in Tamil (தமிழ்). If not found, set answer to "இந்த ஆவணத்தில் இது குறிப்பிடப்படவில்லை." Keep sourceQuote in the original document language.'
        : language === 'hi'
        ? 'Provide the answer strictly in Hindi (हिन्दी). If not found, set answer to "इस दस्तावेज़ में इसका उल्लेख नहीं है।" Keep sourceQuote in the original document language.'
        : 'Provide the answer in English. If not found, set answer to "Not mentioned in this document."';

    const systemInstruction = `You are a strict document question-answering assistant.
CRITICAL RULES:
1. Answer the question using ONLY facts stated in the provided document.
2. If the answer is NOT explicitly mentioned or cannot be verified in the text, you MUST return:
   notMentioned: true and answer: "${notMentionedText}".
3. Do NOT make assumptions or use external knowledge.
4. If found, provide the exact quote in sourceQuote and the section/clause name in sourceClause.
5. ${langRule}`;

    const prompt = `Document:\n"""\n${documentText.trim()}\n"""\n\nQuestion: ${question.trim()}`;

    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let chatResponse: any = null;

    for (const model of candidateModels) {
      try {
        const resp = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.1,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                answer: { type: Type.STRING },
                sourceQuote: { type: Type.STRING },
                sourceClause: { type: Type.STRING },
                notMentioned: { type: Type.BOOLEAN },
              },
              required: ['answer', 'notMentioned'],
            },
          },
        });
        if (resp && resp.text) {
          chatResponse = JSON.parse(resp.text);
          break;
        }
      } catch (err: any) {
        console.warn(`Chat model ${model} failed:`, err?.message);
      }
    }

    if (!chatResponse) {
      res.json({
        answer: notMentionedText,
        notMentioned: true,
      });
      return;
    }

    res.json(chatResponse);
  } catch (err: any) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process question.' });
  }
});

// Production or dev server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Jargon Breaker server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
