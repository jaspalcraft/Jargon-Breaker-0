import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Flame } from 'lucide-react';
import { UIStrings } from '../data/translations';

interface RiskGaugeProps {
  score: number; // 1 to 10
  verdict: string;
  overallRiskLevel: 'low' | 'moderate' | 'high';
  ui?: UIStrings;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, verdict, overallRiskLevel, ui }) => {
  // Clamp score
  const safeScore = Math.min(10, Math.max(1, score || 5));

  const getMeterColor = () => {
    if (safeScore >= 8) return { bg: 'bg-rose-500', text: 'text-rose-600', ring: 'ring-rose-200', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-800' };
    if (safeScore >= 6) return { bg: 'bg-amber-500', text: 'text-amber-600', ring: 'ring-amber-200', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800' };
    if (safeScore >= 4) return { bg: 'bg-yellow-500', text: 'text-yellow-700', ring: 'ring-yellow-200', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-800' };
    return { bg: 'bg-emerald-500', text: 'text-emerald-600', ring: 'ring-emerald-200', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800' };
  };

  const style = getMeterColor();

  const highLabel = ui?.highRisk || 'High Risk';
  const medLabel = ui?.medRisk || 'Medium Risk';
  const lowLabel = ui?.lowRisk || 'Low Risk';

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left side: Score Dial and Label */}
        <div className="flex items-center gap-4">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-md">
            {/* Circular score dial visual */}
            <div className="text-center">
              <span className={`text-2xl sm:text-3xl font-black tracking-tight ${style.text}`}>
                {safeScore}
              </span>
              <span className="text-[11px] font-bold text-slate-400 block -mt-1">/10</span>
            </div>
            <div
              className={`absolute -top-1.5 -right-1.5 p-1 rounded-full text-white shadow-sm ${style.bg}`}
            >
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {ui?.riskSeverity || 'Risk Severity Score'}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
                {safeScore >= 8 ? highLabel : safeScore >= 5 ? medLabel : lowLabel}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {verdict}
            </h3>
          </div>
        </div>

        {/* Right side: 10-step Bar Visual */}
        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex justify-between text-[11px] font-bold text-slate-500">
            <span>{ui?.standardRisk || '1 (Standard)'}</span>
            <span>{ui?.riskLevelDisplay || 'Risk Level:'} {safeScore}/10</span>
            <span>{ui?.predatoryRisk || '10 (Predatory)'}</span>
          </div>
          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex p-0.5 gap-0.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => {
              const isFilled = step <= safeScore;
              let stepBg = 'bg-slate-300/60';
              if (isFilled) {
                if (step <= 3) stepBg = 'bg-emerald-500';
                else if (step <= 6) stepBg = 'bg-yellow-400';
                else if (step <= 8) stepBg = 'bg-amber-500';
                else stepBg = 'bg-rose-500';
              }
              return (
                <div
                  key={step}
                  className={`flex-1 h-full rounded-xs transition-all duration-300 ${stepBg}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
