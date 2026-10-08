import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle2, ListChecks, AlertCircle, Copy, Check, MessageSquareText, ArrowUpRight } from 'lucide-react';
import { ActionItem } from '../types';
import { UIStrings } from '../data/translations';

interface ActionChecklistProps {
  items: ActionItem[];
  fontSize: 'normal' | 'large' | 'xlarge';
  onJumpToClause?: (clauseTrigger: string, clauseIdRef?: string) => void;
  ui?: UIStrings;
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({
  items,
  fontSize,
  onJumpToClause,
  ui,
}) => {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setCompletedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyQuestion = (e: React.MouseEvent, item: ActionItem) => {
    e.stopPropagation();
    const question = item.questionToAsk || `Could we clarify or amend the following clause: "${item.triggeredByClause}"?`;
    navigator.clipboard.writeText(question);
    setCopiedQuestionId(item.id);
    setTimeout(() => setCopiedQuestionId(null), 2000);
  };

  const total = items.length;
  const completedCount = items.filter((item) => completedMap[item.id]).length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const handleCopyChecklist = () => {
    const textToCopy = items
      .map(
        (item, idx) =>
          `[${completedMap[item.id] ? 'X' : ' '}] ${idx + 1}. ${item.action}\n    Triggered by: ${item.triggeredByClause}\n    Ready Question: ${item.questionToAsk || 'N/A'}\n    Urgency: ${item.urgency.toUpperCase()}`
      )
      .join('\n\n');

    navigator.clipboard.writeText(`JARGON BREAKER — WHAT TO DO NEXT CHECKLIST\n\n${textToCopy}\n\nDisclaimer: Simplified explanation, not legal or medical advice.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return {
          bg: 'bg-rose-100 text-rose-800 border-rose-200',
          dot: 'bg-rose-600',
          label: ui?.highRisk ? 'Urgent' : 'Urgent',
        };
      case 'important':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-200',
          dot: 'bg-amber-600',
          label: 'Important',
        };
      default:
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-600',
          label: 'Recommended',
        };
    }
  };

  return (
    <section id="action-checklist" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <ListChecks className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              {ui?.whatShouldIDoNext || 'What Should I Do Next?'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {ui?.actionSubtitle || 'Prioritized action plan with ready-to-ask negotiation lines and click-to-jump clauses.'}
          </p>
        </div>

        {/* Copy / Export Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyChecklist}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            title="Copy checklist to notes"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{ui?.copied || 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{ui?.copyChecklist || 'Copy Checklist'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
          <span>{ui?.actionProgress || 'Action Progress'}</span>
          <span className="text-emerald-700">
            {completedCount} {ui?.ofDone || 'of'} {total} ({percentage}%)
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3.5">
        {items.map((item) => {
          const isDone = Boolean(completedMap[item.id]);
          const badge = getUrgencyBadge(item.urgency);
          const isQuestionCopied = copiedQuestionId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 group select-none ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs text-slate-900'
              }`}
            >
              {/* Checkbox Icon */}
              <button
                type="button"
                className="mt-0.5 shrink-0 focus:outline-hidden"
                aria-label={isDone ? 'Mark as incomplete' : 'Mark as completed'}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 transition-transform scale-110" />
                ) : (
                  <div className="w-5 h-5 rounded-md border-2 border-slate-300 group-hover:border-indigo-500 transition-colors flex items-center justify-center"></div>
                )}
              </button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badge.bg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                    {badge.label}
                  </span>

                  {item.category && (
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  )}

                  {/* Click-to-jump button */}
                  {onJumpToClause && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onJumpToClause(item.triggeredByClause, item.clauseIdRef);
                      }}
                      className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/70 hover:bg-indigo-100 px-2 py-0.5 rounded-md transition-colors"
                      title="Scroll to and flash highlighted clause"
                    >
                      <span>{ui?.jumpToClause || 'Jump to clause'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* The main action */}
                <p
                  className={`font-semibold leading-snug transition-all ${
                    isDone ? 'line-through text-slate-400' : 'text-slate-900'
                  } ${fontSize === 'xlarge' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
                >
                  {item.action}
                </p>

                {/* Ready-to-ask line for landlord/doctor/office */}
                {item.questionToAsk && (
                  <div className="mt-2.5 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs text-amber-950">
                      <span className="font-bold text-amber-900 block sm:inline mr-1">
                        {ui?.readyToAsk || '💬 Ready to ask:'}
                      </span>
                      <span className="italic">"{item.questionToAsk}"</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleCopyQuestion(e, item)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg border shrink-0 transition-colors ${
                        isQuestionCopied
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 hover:bg-amber-100 border-amber-300'
                      }`}
                    >
                      {isQuestionCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>{ui?.copied || 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-amber-700" />
                          <span>{ui?.copyQuestion || 'Copy question'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* The clause that caused it */}
                <div className="mt-2 text-xs text-slate-500 flex items-start gap-1.5 bg-slate-100/70 p-2 rounded-lg border border-slate-200/60">
                  <span className="font-bold text-slate-600 shrink-0">{ui?.triggeredBy || 'Triggered by clause:'}</span>
                  <span className="italic font-mono text-slate-700 break-words line-clamp-2">
                    {item.triggeredByClause}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checklist Footer Note */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Click any row to toggle completed state</span>
        <span className="font-medium italic">{ui?.disclaimer || 'Simplified explanation, not legal or medical advice'}</span>
      </div>
    </section>
  );
};

