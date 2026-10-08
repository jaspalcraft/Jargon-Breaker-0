import type { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import { SAMPLE_ANALYSES, generateRuleBasedAnalysis } from '../src/data/sampleAnalyses.ts';
import { SAMPLE_ANALYSES_TRANSLATED, LanguageCode } from '../src/data/translations.ts';

function findQuoteSpan(docText: string, quote: string): { start: number; end: number; matchedQuote: string } | null {
  if (!quote || !docText) return null;
  const trimmedQuote = quote.trim();
  if (trimmedQuote.length < 5) return null;

  const directIdx = docText.indexOf(trimmedQuote);
  if (directIdx !== -1) {
    return {
      start: directIdx,
      end: directIdx + trimmedQuote.length,
      matchedQuote: docText.substring(directIdx, directIdx + trimmedQuote.length),
    };
  }

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

  return null;
}

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { documentText, language = 'en' } = req.body;
    const targetLang = (language || 'en') as LanguageCode;

    if (!documentText || typeof documentText !== 'string' || documentText.trim().length < 20) {
      return res.status(400).json({ error: 'Please paste a document with at least 20 characters.' });
    }

    let sampleKey: string | null = null;
    if (documentText.includes('742 Evergreen Terrace') || documentText.includes('APEX REALTY HOLDINGS')) {
      sampleKey = 'rental-agreement';
    } else if (documentText.includes('VALLEY MEMORIAL HEALTH') || documentText.includes('DIAGNOSTIC ARTHROSCOPY')) {
      sampleKey = 'medical-consent';
    } else if (documentText.includes('DEPARTMENT OF BUILDING & CODE') || documentText.includes('CITY OF METROPOLIS')) {
      sampleKey = 'government-notice';
    }

    if (sampleKey) {
      const base = SAMPLE_ANALYSES[sampleKey];
      const trans = SAMPLE_ANALYSES_TRANSLATED[targetLang]?.[sampleKey] || {};
      if (base) {
        return res.status(200).json({
          ...base,
          ...trans,
          language: targetLang,
          characterCount: documentText.length,
          analyzedAt: new Date().toISOString(),
        });
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json(generateRuleBasedAnalysis(documentText, targetLang));
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let lastError: any = null;
    let response: any = null;

    const langPrompt = targetLang === 'hi' 
      ? 'CRITICAL: Output all explanations, plainLanguageSummary, and actionChecklist items in Hindi (हिन्दी). Keep exactQuote exactly as in original text.' 
      : targetLang === 'ta' 
      ? 'CRITICAL: Output all explanations, plainLanguageSummary, and actionChecklist items in Tamil (தமிழ்). Keep exactQuote exactly as in original text.' 
      : '';

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: `Analyze the following document and identify risky clauses and action items:\n\n${documentText.trim()}`,
          config: {
            systemInstruction: `You are Jargon Breaker.
Analyze document:
1. Provide a plain language summary in simple words.
2. Identify risky or unfair clauses. exactQuote MUST be an EXACT, verbatim excerpt from the document.
3. Provide what to do next checklist where each item cites the clause that triggered it.
4. Output valid JSON. ${langPrompt}`,
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                documentType: { type: Type.STRING },
                overallRiskLevel: { type: Type.STRING, enum: ['low', 'moderate', 'high'] },
                plainLanguageSummary: { type: Type.STRING },
                keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
                riskyClauses: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      exactQuote: { type: Type.STRING },
                      severity: { type: Type.STRING, enum: ['high', 'amber'] },
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
                      urgency: { type: Type.STRING, enum: ['urgent', 'important', 'recommended'] },
                      category: { type: Type.STRING },
                    },
                    required: ['action', 'triggeredByClause', 'urgency'],
                  },
                },
              },
              required: ['documentType', 'overallRiskLevel', 'plainLanguageSummary', 'keyTakeaways', 'riskyClauses', 'actionChecklist'],
            },
          },
        });
        if (response && response.text) {
          break;
        }
      } catch (callErr: any) {
        lastError = callErr;
        const errMsg = callErr?.message || String(callErr);
        if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
          continue;
        }
      }
    }

    if (!response || !response.text) {
      return res.status(200).json(generateRuleBasedAnalysis(documentText, targetLang));
    }

    const parsed = JSON.parse(response.text || '{}');
    const validClauses: any[] = [];
    (parsed.riskyClauses || []).forEach((clause: any, index: number) => {
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
      }
    });

    return res.status(200).json({
      ...parsed,
      riskyClauses: validClauses,
      analyzedAt: new Date().toISOString(),
      matchedClausesCount: validClauses.length,
      language: targetLang,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Analysis failed' });
  }
}
