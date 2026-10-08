import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { UIStrings, LanguageCode } from '../data/translations';

interface DocumentChatProps {
  documentText: string;
  ui?: UIStrings;
  language?: LanguageCode;
}

export const DocumentChat: React.FC<DocumentChatProps> = ({ documentText, ui, language = 'en' }) => {
  const initialGreeting =
    ui?.chatInitial ||
    'Ask me anything about this document! I will only answer using facts stated in the text, cite the exact source quote, or confirm if it is not mentioned.';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Update initial message when language changes if no conversation yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === 'assistant') {
        return [
          {
            id: 'init-1',
            sender: 'assistant',
            text: initialGreeting,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [initialGreeting]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const suggestedQuestions = [
    ui?.chatSuggested1 || 'Can the landlord enter without advance notice?',
    ui?.chatSuggested2 || 'Who pays if the air conditioner or HVAC breaks?',
    ui?.chatSuggested3 || 'What happens to the security deposit upon moving out?',
    ui?.chatSuggested4 || 'Is there an automatic lease renewal?',
  ];

  const handleAsk = async (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q || isAsking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsAsking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentText, question: q, language }),
      });

      if (!res.ok) throw new Error('Chat failed');
      const data = await res.json();

      const defaultNotMentioned =
        ui?.notMentioned ||
        (language === 'hi'
          ? 'इस दस्तावेज़ में इसका उल्लेख नहीं है'
          : language === 'ta'
          ? 'இந்த ஆவணத்தில் இது குறிப்பிடப்படவில்லை'
          : 'Not mentioned in this document.');

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || defaultNotMentioned,
        sourceQuote: data.sourceQuote,
        sourceClause: data.sourceClause,
        notMentioned: Boolean(data.notMentioned),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Local fallback search in text
      const qLower = q.toLowerCase();
      const words = qLower.split(/\s+/).filter((w) => w.length > 3);
      const sentences = documentText.split(/[.?!]\s+/);
      const matched = sentences.find((s) => words.some((w) => s.toLowerCase().includes(w)));

      const prefix =
        language === 'hi'
          ? 'दस्तावेज़ के अनुसार: '
          : language === 'ta'
          ? 'ஆவணத்தின்படி: '
          : 'According to the document: ';

      const defaultNotMentioned =
        ui?.notMentioned ||
        (language === 'hi'
          ? 'इस दस्तावेज़ में इसका उल्लेख नहीं है।'
          : language === 'ta'
          ? 'இந்த ஆவணத்தில் இது குறிப்பிடப்படவில்லை.'
          : 'Not mentioned in this document.');

      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: matched
          ? `${prefix}"${matched.trim()}"`
          : defaultNotMentioned,
        sourceQuote: matched?.trim(),
        sourceClause: matched ? (language === 'hi' ? 'संदर्भित क्लॉज' : language === 'ta' ? 'குறிப்பிடப்பட்ட பிரிவு' : 'Matched Section') : undefined,
        notMentioned: !matched,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-6">
      <div className="flex items-center gap-2 mb-2 pb-3 border-b border-slate-100">
        <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
          <MessageSquare className="w-5 h-5" />
        </span>
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-sans">
            {ui?.askAnything || 'Chat with Your Document'}
          </h3>
          <p className="text-xs text-slate-500">
            {ui?.askSubtitle || 'Strict grounded answers citing exact clauses. Tells you if a term is not in the text.'}
          </p>
        </div>
      </div>

      {/* Suggested Chips */}
      <div className="flex items-center gap-1.5 flex-wrap my-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
          {ui?.tryAsking || 'Try asking:'}
        </span>
        {suggestedQuestions.map((sq, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAsk(sq)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 transition-colors text-slate-700 font-medium cursor-pointer"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-3.5 max-h-80 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200/70 mb-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-2xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-xs'
                  : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs'
              }`}
            >
              <p>{m.text}</p>

              {/* Source citation */}
              {m.sourceQuote && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg font-mono">
                  <div className="font-bold text-indigo-700 flex items-center gap-1 mb-1 font-sans">
                    <span>{ui?.sourceLabel || '📌 Source:'}</span>
                    <span>{m.sourceClause || 'Document Text'}</span>
                  </div>
                  <div className="italic text-slate-700">"{m.sourceQuote}"</div>
                </div>
              )}

              {m.notMentioned && m.sender === 'assistant' && (
                <div className="mt-2 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                  <span>{ui?.notMentioned || 'ℹ️ Not mentioned in this document'}</span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isAsking && (
          <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium p-2">
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Scanning document...</span>
          </div>
        )}
      </div>

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={ui?.askPlaceholder || "Ask a question about this document..."}
          className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          disabled={isAsking}
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || isAsking}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{ui?.askBtn || 'Ask'}</span>
        </button>
      </form>
    </div>
  );
};
