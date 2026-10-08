import React from 'react';
import { BookOpen, X } from 'lucide-react';
import { GlossaryTerm } from '../types';
import { UIStrings } from '../data/translations';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  terms: GlossaryTerm[];
  ui?: UIStrings;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose, terms, ui }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {ui?.glossaryTitle || 'Key Legal & Medical Terms'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5">
          {terms.map((t, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-1">
                {t.term}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t.plainMeaning}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            {ui?.doneBtn || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
