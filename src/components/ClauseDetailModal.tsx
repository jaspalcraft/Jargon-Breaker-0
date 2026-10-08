import React, { useEffect } from 'react';
import { X, AlertCircle, AlertTriangle, Shield, CheckCircle2, ArrowRight, CornerDownRight } from 'lucide-react';
import { RiskyClause } from '../types';
import { UIStrings } from '../data/translations';

interface ClauseDetailModalProps {
  clause: RiskyClause | null;
  onClose: () => void;
  onJumpToChecklist?: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  ui?: UIStrings;
}

export const ClauseDetailModal: React.FC<ClauseDetailModalProps> = ({
  clause,
  onClose,
  onJumpToChecklist,
  fontSize,
  ui,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!clause) return null;

  const isHigh = clause.severity === 'high';
  const isAmber = clause.severity === 'amber';

  const highBadge = ui?.highRisk || 'High Risk Clause';
  const medBadge = ui?.medRisk || 'Medium Risk / Caution';
  const lowBadge = ui?.lowRisk || 'Low Risk / Advisory';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-5 sm:p-6 border-b flex items-start justify-between gap-3 ${
            isHigh
              ? 'bg-rose-50/80 border-rose-100'
              : isAmber
              ? 'bg-amber-50/80 border-amber-100'
              : 'bg-yellow-50/80 border-yellow-100'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                isHigh ? 'bg-rose-600 text-white' : isAmber ? 'bg-amber-500 text-white' : 'bg-yellow-500 text-white'
              }`}
            >
              {isHigh ? <AlertCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isHigh
                      ? 'bg-rose-200/80 text-rose-900'
                      : isAmber
                      ? 'bg-amber-200/80 text-amber-900'
                      : 'bg-yellow-200/80 text-yellow-900'
                  }`}
                >
                  {isHigh ? highBadge : isAmber ? medBadge : lowBadge}
                </span>
                <span className="text-xs text-slate-500 font-medium">{ui?.categoryLabel || 'Category:'}</span>
                <span className="text-xs font-bold text-slate-800">{clause.category}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                {ui?.clauseRiskBreakdown || 'Risk Analysis Breakdown'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Exact Clause Quote */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {ui?.exactClauseInDoc || 'Exact Clause in Document'}
            </h4>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 italic leading-relaxed border-l-4 border-l-slate-400">
              "{clause.exactQuote}"
            </div>
          </div>

          {/* Plain explanation of why it is risky */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-rose-500" />
              {ui?.whyRisky || 'Why This is Risky'}
            </h4>
            <div
              className={`p-4 rounded-xl text-slate-900 font-normal leading-relaxed ${
                isHigh ? 'bg-rose-50/50 border border-rose-100 text-rose-950' : 'bg-amber-50/50 border border-amber-100 text-amber-950'
              } ${fontSize === 'xlarge' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
            >
              {clause.riskExplanation}
            </div>
          </div>

          {/* Potential Trap / Worst-case */}
          {clause.potentialTrap && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1.5 flex items-center gap-1.5">
                <CornerDownRight className="w-3.5 h-3.5" />
                {ui?.potentialTrap || 'Potential Trap / Worst-Case Scenario'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                {clause.potentialTrap}
              </p>
            </div>
          )}

          {/* Recommended Action / Negotiation advice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {ui?.recommendedAction || 'Recommended Counter-Action or Request'}
            </h4>
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              {clause.recommendedAction}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 font-medium">
            {ui?.disclaimer || 'Not legal or medical advice'}
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onJumpToChecklist && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onJumpToChecklist();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200"
              >
                <span>{ui?.viewNextSteps || 'View Next-Steps Checklist'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              {ui?.doneBtn || 'Done'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
