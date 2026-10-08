import type { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { documentText, question, language = 'en' } = req.body;
    if (!documentText || !question) {
      return res.status(400).json({ error: 'documentText and question are required.' });
    }

    const notMentionedText =
      language === 'hi'
        ? 'इस दस्तावेज़ में इसका उल्लेख नहीं है'
        : language === 'ta'
        ? 'இந்த ஆவணத்தில் இது குறிப்பிடப்படவில்லை'
        : 'Not mentioned in this document.';

    const prefix =
      language === 'hi'
        ? 'दस्तावेज़ के अनुसार: '
        : language === 'ta'
        ? 'ஆவணத்தின்படி: '
        : 'According to the document: ';

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const qLower = question.toLowerCase();
      const words = qLower.split(/\s+/).filter((w: string) => w.length > 3);
      const sentences = documentText.split(/[.?!]\s+/);
      const matchingSentence = sentences.find((s: string) =>
        words.some((w: string) => s.toLowerCase().includes(w))
      );

      return res.status(200).json({
        answer: matchingSentence
          ? `${prefix}${matchingSentence.trim()}`
          : notMentionedText,
        sourceQuote: matchingSentence?.trim(),
        sourceClause: matchingSentence
          ? (language === 'hi' ? 'संदर्भित क्लॉज' : language === 'ta' ? 'குறிப்பிடப்பட்ட பிரிவு' : 'Referenced Clause')
          : undefined,
        notMentioned: !matchingSentence,
      });
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
      language === 'hi'
        ? 'Answer in Hindi (हिन्दी). If not mentioned, state: "इस दस्तावेज़ में इसका उल्लेख नहीं है".'
        : language === 'ta'
        ? 'Answer in Tamil (தமிழ்). If not mentioned, state: "இந்த ஆவணத்தில் இது குறிப்பிடப்படவில்லை".'
        : 'Answer in English.';

    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let response: any = null;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: `Document:\n"""\n${documentText.trim()}\n"""\n\nQuestion: ${question.trim()}`,
          config: {
            systemInstruction: `You are a strict document question-answering assistant.
Answer ONLY using facts directly stated in the document. ${langInstruction}
If the answer is NOT explicitly mentioned in the text, you MUST return:
"${notMentionedText}" (and set notMentioned to true).
If found, provide exact quote in sourceQuote and section in sourceClause.`,
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
        if (response && response.text) {
          break;
        }
      } catch (callErr: any) {
        continue;
      }
    }

    if (!response || !response.text) {
      // Local fallback
      const qLower = question.toLowerCase();
      const words = qLower.split(/\s+/).filter((w: string) => w.length > 3);
      const sentences = documentText.split(/[.?!]\s+/);
      const matchingSentence = sentences.find((s: string) =>
        words.some((w: string) => s.toLowerCase().includes(w))
      );

      return res.status(200).json({
        answer: matchingSentence
          ? `${prefix}${matchingSentence.trim()}`
          : notMentionedText,
        sourceQuote: matchingSentence?.trim(),
        sourceClause: matchingSentence
          ? (language === 'hi' ? 'संदर्भित क्लॉज' : language === 'ta' ? 'குறிப்பிடப்பட்ட பிரிவு' : 'Referenced Clause')
          : undefined,
        notMentioned: !matchingSentence,
      });
    }

    const parsed = JSON.parse(response.text || '{}');
    return res.status(200).json(parsed);
  } catch (error: any) {
    return res.status(200).json({
      answer: 'This detail is not mentioned in this document.',
      notMentioned: true,
    });
  }
}
