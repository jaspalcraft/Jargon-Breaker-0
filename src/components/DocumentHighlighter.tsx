import React, { useMemo, useState } from 'react';
import { AlertCircle, AlertTriangle, HelpCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { RiskyClause } from '../types';
import { UIStrings } from '../data/translations';

interface DocumentHighlighterProps {
  documentText: string;
  riskyClauses: RiskyClause[];
  selectedClauseId: string | null;
  onSelectClause: (clause: RiskyClause) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  flashedClauseId?: string | null;
  ui?: UIStrings;
}

interface TextSpan {
  type: 'plain' | 'highlight';
  text: string;
  clause?: RiskyClause;
  index?: number;
}

export const DocumentHighlighter: React.FC<DocumentHighlighterProps> = ({
  documentText,
  riskyClauses,
  selectedClauseId,
  onSelectClause,
  fontSize,
  flashedClauseId,
  ui,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'amber' | 'yellow'>('all');

  // Filter clauses by severity if user chooses
  const activeClauses = useMemo(() => {
    if (filterSeverity === 'all') return riskyClauses;
    return riskyClauses.filter((c) => c.severity === filterSeverity);
  }, [riskyClauses, filterSeverity]);

  // Find occurrences of exact quotes in documentText and build non-overlapping spans
  const { spans, validHighlightsCount, skippedQuotesCount } = useMemo(() => {
    if (!documentText) {
      return { spans: [], validHighlightsCount: 0, skippedQuotesCount: 0 };
    }

    interface MatchRange {
      start: number;
      end: number;
      clause: RiskyClause;
    }

    const matches: MatchRange[] = [];
    let skipped = 0;

    // Check each clause's quote in the original text
    for (const clause of activeClauses) {
      const quote = clause.exactQuote?.trim();
      if (!quote) {
        skipped++;
        continue;
      }

      // Check if startIndex and endIndex are already known and valid
      let startIdx = -1;
      let matchedLength = quote.length;

      if (
        clause.startIndex !== undefined &&
        clause.endIndex !== undefined &&
        clause.startIndex >= 0 &&
        clause.endIndex <= documentText.length &&
        documentText.substring(clause.startIndex, clause.endIndex).trim().length > 0
      ) {
        startIdx = clause.startIndex;
        matchedLength = clause.endIndex - clause.startIndex;
      } else {
        // Direct search
        startIdx = documentText.indexOf(quote);
        if (startIdx === -1) {
          // Case-insensitive fallback
          startIdx = documentText.toLowerCase().indexOf(quote.toLowerCase());
        }
      }

      if (startIdx !== -1) {
        matches.push({
          start: startIdx,
          end: startIdx + matchedLength,
          clause,
        });
      } else {
        // "If a quote is not found in the text, skip that highlight."
        skipped++;
      }
    }

    // Sort matches by start index
    matches.sort((a, b) => a.start - b.start);

    // Remove overlapping intervals (greedy keep first/longest)
    const nonOverlapping: MatchRange[] = [];
    let lastEnd = 0;

    for (const m of matches) {
      if (m.start >= lastEnd) {
        nonOverlapping.push(m);
        lastEnd = m.end;
      } else if (m.end > lastEnd && m.start >= (nonOverlapping[nonOverlapping.length - 1]?.start || 0)) {
        // Overlap detected: Skip secondary overlapping highlight
        continue;
      }
    }

    // Build segments
    const resultSpans: TextSpan[] = [];
    let cursor = 0;

    nonOverlapping.forEach((m, idx) => {
      // Plain text before highlight
      if (m.start > cursor) {
        resultSpans.push({
          type: 'plain',
          text: documentText.substring(cursor, m.start),
        });
      }
      // Highlighted span
      resultSpans.push({
        type: 'highlight',
        text: documentText.substring(m.start, m.end),
        clause: m.clause,
        index: idx + 1,
      });
      cursor = m.end;
    });

    // Remainder plain text
    if (cursor < documentText.length) {
      resultSpans.push({
        type: 'plain',
        text: documentText.substring(cursor),
      });
    }

    return {
      spans: resultSpans,
      validHighlightsCount: nonOverlapping.length,
      skippedQuotesCount: skipped,
    };
  }, [documentText, activeClauses]);

  const highCount = riskyClauses.filter((c) => c.severity === 'high').length;
  const amberCount = riskyClauses.filter((c) => c.severity === 'amber').length;
  const yellowCount = riskyClauses.filter((c) => c.severity === 'yellow').length;

  const fontClass =
    fontSize === 'xlarge'
      ? 'text-lg leading-loose'
      : fontSize === 'large'
      ? 'text-base leading-relaxed'
      : 'text-sm leading-relaxed';

  // Navigation between clauses
  const currentHighlightIndex = riskyClauses.findIndex((c) => c.id === selectedClauseId);

  const handlePrevClause = () => {
    if (riskyClauses.length === 0) return;
    const prevIdx = (currentHighlightIndex - 1 + riskyClauses.length) % riskyClauses.length;
    onSelectClause(riskyClauses[prevIdx]);
  };

  const handleNextClause = () => {
    if (riskyClauses.length === 0) return;
    const nextIdx = (currentHighlightIndex + 1) % riskyClauses.length;
    onSelectClause(riskyClauses[nextIdx]);
  };

  return (
    <section id="document-viewer" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-7">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Eye className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              {ui?.originalDocTitle || 'Original Document with Risky Clauses'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {ui?.originalDocSubtitle || 'Color-coded by risk: Red (High), Amber (Medium), Yellow (Low/Advisory).'}
          </p>
        </div>

        {/* Severity Legend & Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setFilterSeverity('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
              filterSeverity === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {ui?.allFlags || 'All'} ({riskyClauses.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterSeverity('high')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
              filterSeverity === 'high'
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            {ui?.highRisk || 'High'} ({highCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterSeverity('amber')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
              filterSeverity === 'amber'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {ui?.medRisk || 'Medium'} ({amberCount})
          </button>
          {yellowCount > 0 && (
            <button
              type="button"
              onClick={() => setFilterSeverity('yellow')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                filterSeverity === 'yellow'
                  ? 'bg-yellow-500 text-white border-yellow-500 shadow-xs'
                  : 'bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              {ui?.lowRisk || 'Low'} ({yellowCount})
            </button>
          )}

          {/* Stepper navigation */}
          {riskyClauses.length > 0 && (
            <div className="flex items-center ml-auto sm:ml-2 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                type="button"
                onClick={handlePrevClause}
                className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
                title="Previous risky clause"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-semibold text-slate-600 px-2">
                {currentHighlightIndex >= 0 ? `${currentHighlightIndex + 1}/${riskyClauses.length}` : `${riskyClauses.length} flags`}
              </span>
              <button
                type="button"
                onClick={handleNextClause}
                className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
                title="Next risky clause"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Highlighter instruction banner */}
      <div className="my-3 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Highlighted clauses indicate dangerous or unfair language. <strong>Tap any colored text</strong> to view the explanation.
          </span>
        </div>
        {validHighlightsCount > 0 && (
          <span className="font-semibold text-slate-700 shrink-0 hidden sm:inline">
            {validHighlightsCount} highlighted {validHighlightsCount === 1 ? 'clause' : 'clauses'}
          </span>
        )}
      </div>

      {/* Document Text Box with Highlights */}
      <div
        className={`mt-4 p-5 sm:p-6 bg-slate-50/70 border border-slate-200 rounded-2xl whitespace-pre-wrap font-mono text-slate-800 ${fontClass} max-h-[600px] overflow-y-auto selection:bg-indigo-100`}
      >
        {spans.map((span, idx) => {
          if (span.type === 'plain') {
            return <span key={idx}>{span.text}</span>;
          }

          const clause = span.clause!;
          const isSelected = selectedClauseId === clause.id;
          const isFlashed = flashedClauseId === clause.id;
          const isHigh = clause.severity === 'high';
          const isAmber = clause.severity === 'amber';

          let highlightClasses = 'bg-yellow-100 hover:bg-yellow-200 text-yellow-950 border-b-2 border-yellow-500';
          let badgeClasses = 'bg-yellow-200/90 text-yellow-900';

          if (isHigh) {
            highlightClasses = isSelected
              ? 'bg-rose-300 text-rose-950 font-semibold ring-3 ring-rose-500 shadow-md'
              : 'bg-rose-100 hover:bg-rose-200 text-rose-900 font-medium border-b-2 border-rose-500';
            badgeClasses = 'bg-rose-200/90 text-rose-900';
          } else if (isAmber) {
            highlightClasses = isSelected
              ? 'bg-amber-300 text-amber-950 font-semibold ring-3 ring-amber-500 shadow-md'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-950 font-medium border-b-2 border-amber-500';
            badgeClasses = 'bg-amber-200/90 text-amber-900';
          } else {
            // Yellow
            highlightClasses = isSelected
              ? 'bg-yellow-300 text-yellow-950 font-semibold ring-3 ring-yellow-500 shadow-md'
              : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-950 font-medium border-b-2 border-yellow-500';
          }

          if (isFlashed) {
            highlightClasses += ' ring-4 ring-indigo-500 shadow-xl animate-pulse scale-[1.01]';
          }

          return (
            <mark
              key={idx}
              id={`highlight-${clause.id}`}
              onClick={() => onSelectClause(clause)}
              className={`inline rounded-md px-1.5 py-0.5 my-0.5 cursor-pointer transition-all duration-150 relative group ${highlightClasses}`}
              title={`Click to view: ${clause.category} (${isHigh ? 'High Risk' : isAmber ? 'Medium Risk' : 'Low Risk'})`}
            >
              <span className="inline-flex items-center gap-0.5 mr-1 align-baseline select-none">
                {isHigh ? (
                  <AlertCircle className="w-3.5 h-3.5 inline text-rose-600 -translate-y-0.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 inline text-amber-600 -translate-y-0.5" />
                )}
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-1 py-0.2 rounded ${badgeClasses}`}
                >
                  {clause.category}
                </span>
              </span>
              <span>{span.text}</span>
            </mark>
          );
        })}
      </div>
    </section>
  );
};
