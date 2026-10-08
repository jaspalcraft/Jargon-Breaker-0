import React, { useState } from 'react';
import { ArrowRight, Sparkles, FileText, Trash2, Clipboard, ChevronDown, CheckCircle2 } from 'lucide-react';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_DOCUMENTS, SampleDoc } from '../data/samples';

interface DocumentInputProps {
  text: string;
  onChangeText: (text: string) => void;
  documentType: string;
  onChangeDocumentType: (type: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSelectSample: (sample: SampleDoc) => void;
}

export const DocumentInput: React.FC<DocumentInputProps> = ({
  text,
  onChangeText,
  documentType,
  onChangeDocumentType,
  onAnalyze,
  isLoading,
  onSelectSample,
}) => {
  const [showMoreSamples, setShowMoreSamples] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handlePasteClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        onChangeText(clipboardText);
      }
    } catch (err) {
      console.warn('Clipboard read failed', err);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Paste Your Document
            </h2>

            {/* Document Type Dropdown */}
            <div className="flex items-center gap-1.5 ml-1">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">Type:</span>
              <select
                value={documentType}
                onChange={(e) => onChangeDocumentType(e.target.value)}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="auto">Auto-detect Document</option>
                <option value="Rental / Housing Lease">Rental / Legal Lease</option>
                <option value="Medical / Healthcare Consent">Medical / Hospital Consent</option>
                <option value="Government / Municipal Notice">Government / City Notice</option>
                <option value="Employment / NDA">Employment / NDA</option>
              </select>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Rental leases, surgical waivers, parking/code violations, terms of service, or insurance paperwork.
          </p>
        </div>

        {/* Action Buttons: Try Example & Quick paste */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative inline-flex items-center">
            {/* Primary "Try example" button with sample rental agreement */}
            <button
              type="button"
              onClick={() => {
                onSelectSample(SAMPLE_RENTAL_AGREEMENT);
                onChangeDocumentType('Rental / Housing Lease');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-l-xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-colors shadow-2xs"
              title="Load sample rental lease with hidden risky clauses"
            >
              <span className="text-base leading-none">🏠</span>
              <span>Try example</span>
              <span className="text-[11px] font-normal text-amber-700 bg-amber-200/60 px-1.5 py-0.2 rounded hidden md:inline">
                Rental Lease
              </span>
            </button>
            <button
              type="button"
              onClick={() => setShowMoreSamples(!showMoreSamples)}
              className="px-2 py-1.5 text-xs font-semibold rounded-r-xl bg-amber-50 text-amber-900 border border-l-0 border-amber-200 hover:bg-amber-100 transition-colors"
              title="More sample documents (Medical, Government)"
              aria-label="More document samples"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMoreSamples ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown for other sample documents */}
            {showMoreSamples && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-20 text-xs">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Document Sample
                </div>
                {SAMPLE_DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => {
                      onSelectSample(doc);
                      onChangeDocumentType(
                        doc.id === 'medical-consent'
                          ? 'Medical / Healthcare Consent'
                          : doc.id === 'government-notice'
                          ? 'Government / Municipal Notice'
                          : 'Rental / Housing Lease'
                      );
                      setShowMoreSamples(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex flex-col gap-0.5 border-b border-slate-100 last:border-0"
                  >
                    <span className="font-semibold text-slate-800">{doc.name}</span>
                    <span className="text-[10px] text-indigo-600 font-medium">{doc.tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handlePasteClipboard}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            title="Paste text from clipboard"
          >
            <Clipboard className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Paste</span>
          </button>

          {text && (
            <button
              type="button"
              onClick={() => onChangeText('')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-xl text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200"
              title="Clear text box"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Document Text Area */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Paste any rental lease, medical agreement, gym membership, government compliance notice, terms of service, or hospital waiver here...

Tip: Or click 'Try example' above to see a lease with hidden 24-month automatic renewal and repair traps!"
          className="w-full h-56 sm:h-64 p-4 text-sm sm:text-base leading-relaxed text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-600 transition-all resize-y font-mono font-normal placeholder:font-sans placeholder:text-slate-400"
          disabled={isLoading}
        />

        {/* Word count & keyboard shortcut tip */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 mt-1.5">
          <div className="flex items-center gap-2">
            <span>{charCount.toLocaleString()} chars</span>
            <span>•</span>
            <span>{wordCount.toLocaleString()} words</span>
          </div>
          <span className="hidden sm:inline text-slate-400">
            Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-600">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-600">Enter</kbd> to analyze
          </span>
        </div>
      </div>

      {/* Main Analyze Button */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Zero data stored • AI reads only within your session</span>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={isLoading || !text.trim()}
          className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white shadow-lg transition-all transform active:scale-98 ${
            isLoading || !text.trim()
              ? 'bg-slate-300 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-rose-600 hover:from-indigo-500 hover:to-rose-500 shadow-indigo-500/25 cursor-pointer hover:shadow-indigo-500/40'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing Document...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Analyze Document</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </section>
  );
};
