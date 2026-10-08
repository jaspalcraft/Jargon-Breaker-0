import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { UIStrings } from '../data/translations';

interface HeaderProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  language: 'en' | 'hi' | 'ta';
  setLanguage: (lang: 'en' | 'hi' | 'ta') => void;
  ui: UIStrings;
  onOpenGlossary?: () => void;
  hasGlossary?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  fontSize,
  setFontSize,
  language,
  setLanguage,
  ui,
  onOpenGlossary,
  hasGlossary,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                {ui.appName}
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200/80">
                {ui.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              {ui.tagline}
            </p>
          </div>
        </div>

        {/* Right tools: Language, Font Sizer, Glossary */}
        <div className="flex items-center gap-2 sm:gap-2.5 ml-auto flex-wrap">
          {/* Tamil / Hindi / English Language Selector */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 shadow-inner">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white text-indigo-950 shadow-xs ring-1 ring-slate-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Hindi (हिन्दी)"
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'ta'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tamil (தமிழ்)"
            >
              தமிழ்
            </button>
          </div>

          {/* Big readable text toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200" title={ui.fontSizeTitle}>
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                fontSize === 'normal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Default text size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                fontSize === 'large'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Large text size"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                fontSize === 'xlarge'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Extra large text size"
            >
              A++
            </button>
          </div>

          {/* Glossary button if available */}
          {hasGlossary && onOpenGlossary && (
            <button
              type="button"
              onClick={onOpenGlossary}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              {ui.glossaryBtn}
            </button>
          )}

          <div className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{ui.noticeNotAdvice}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
