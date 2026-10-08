import React from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, AlertCircle, BookmarkCheck } from 'lucide-react';
import { DocumentAnalysis } from '../types';
import { UIStrings } from '../data/translations';

interface PlainWordsSummaryProps {
  analysis: DocumentAnalysis;
  fontSize: 'normal' | 'large' | 'xlarge';
  language?: 'en' | 'hi' | 'ta';
  ui?: UIStrings;
}

export const PlainWordsSummary: React.FC<PlainWordsSummaryProps> = ({
  analysis,
  fontSize,
  language = 'en',
  ui,
}) => {
  const textSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg sm:text-xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  const titleText =
    ui?.inPlainWordsTitle ||
    (language === 'hi' ? 'सरल शब्दों में सारांश' : language === 'ta' ? 'எளிய சொற்களில் சுருக்கம்' : 'In Plain Words');
  const detectedLabel =
    ui?.detectedDoc ||
    (language === 'hi' ? 'पहचाना गया:' : language === 'ta' ? 'கண்டறியப்பட்டது:' : 'Detected:');
  const takeawaysLabel =
    ui?.coreTakeaways ||
    (language === 'hi' ? 'मुख्य निष्कर्ष व बातें' : language === 'ta' ? 'முக்கிய குறிப்புகள்' : 'Core Bottom-Line Takeaways');

  const riskBadge = {
    high: {
      label: language === 'hi' ? 'उच्च जोखिम दस्तावेज़' : language === 'ta' ? 'அதிக ஆபத்து ஆவணம்' : 'High Risk Document',
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: AlertCircle,
      dot: 'bg-rose-600',
    },
    moderate: {
      label: language === 'hi' ? 'मध्यम जोखिम (सावधानी आवश्यक)' : language === 'ta' ? 'நடுத்தர ஆபத்து (எச்சரிக்கை தேவை)' : 'Moderate Risk (Requires Caution)',
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertTriangle,
      dot: 'bg-amber-500',
    },
    low: {
      label: language === 'hi' ? 'सामान्य / सुरक्षित' : language === 'ta' ? 'வழக்கமான / குறைந்த ஆபத்து' : 'Standard / Low Risk',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: ShieldCheck,
      dot: 'bg-emerald-600',
    },
  }[analysis.overallRiskLevel] || {
    label: 'Needs Review',
    bg: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: AlertTriangle,
    dot: 'bg-slate-600',
  };

  const RiskIcon = riskBadge.icon;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 overflow-hidden">
      {/* Header with Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              {titleText}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {detectedLabel} <span className="font-semibold text-slate-700">{analysis.documentType}</span>
          </p>
        </div>

        {/* Overall Risk Assessment Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold ${riskBadge.bg}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${riskBadge.dot} animate-pulse`}></span>
          <RiskIcon className="w-4 h-4 shrink-0" />
          <span>{riskBadge.label}</span>
        </div>
      </div>

      {/* Main Plain Language Summary */}
      <div className="mt-5 space-y-4">
        <div className={`text-slate-800 font-normal ${textSizeClass} whitespace-pre-line space-y-3`}>
          {analysis.plainLanguageSummary}
        </div>
      </div>

      {/* Key Takeaways */}
      {analysis.keyTakeaways && analysis.keyTakeaways.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <BookmarkCheck className="w-4 h-4 text-indigo-600" />
            {takeawaysLabel}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {analysis.keyTakeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className={`font-medium ${fontSize === 'xlarge' ? 'text-base' : 'text-xs sm:text-sm'}`}>
                  {takeaway}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
