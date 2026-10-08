import React, { useEffect, useState } from 'react';
import { ShieldAlert, Sparkles, FileSearch, CheckCircle2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  const steps = [
    'Parsing document structure & detecting document type...',
    'Demystifying legal & medical jargon into plain words...',
    'Scanning for risky clauses, unilateral traps & hidden penalties...',
    'Matching verbatim clause quotes for text highlighting...',
    'Generating actionable next-steps checklist...',
  ];

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8">
      {/* Animated Spinner with Glowing Halo */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="w-20 h-20 rounded-full border-4 border-indigo-100 border-t-indigo-600 border-r-rose-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FileSearch className="w-8 h-8 text-indigo-600 animate-pulse" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        Breaking Down the Jargon
      </h3>
      <p className="text-sm sm:text-base text-slate-600 mb-6">
        Translating complex clauses into clear, plain words...
      </p>

      {/* Progress steps */}
      <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-100 space-y-2.5 mb-6">
        {steps.map((step, idx) => {
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex;
          return (
            <div
              key={step}
              className={`flex items-center gap-2.5 text-xs sm:text-sm transition-all duration-300 ${
                isDone
                  ? 'text-emerald-700 font-medium'
                  : isCurrent
                  ? 'text-indigo-950 font-bold scale-[1.01]'
                  : 'text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0"></div>
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0"></div>
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 font-medium italic">
        Not legal or medical advice.
      </p>
    </div>
  );
};
