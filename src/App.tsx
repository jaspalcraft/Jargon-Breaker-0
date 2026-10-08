import React, { useState } from 'react';
import { Header } from './components/Header';
import { DocumentInput } from './components/DocumentInput';
import { LoadingState } from './components/LoadingState';
import { PlainWordsSummary } from './components/PlainWordsSummary';
import { DocumentHighlighter } from './components/DocumentHighlighter';
import { ActionChecklist } from './components/ActionChecklist';
import { ClauseDetailModal } from './components/ClauseDetailModal';
import { RiskGauge } from './components/RiskGauge';
import { DeadlinesDetector } from './components/DeadlinesDetector';
import { DocumentChat } from './components/DocumentChat';
import { GlossaryModal } from './components/GlossaryModal';
import { SAMPLE_RENTAL_AGREEMENT, SampleDoc } from './data/samples';
import { SAMPLE_ANALYSES, generateRuleBasedAnalysis } from './data/sampleAnalyses';
import { UI_TRANSLATIONS, SAMPLE_ANALYSES_TRANSLATED, LanguageCode } from './data/translations';
import { DocumentAnalysis, RiskyClause } from './types';
import { AlertCircle, ArrowDown, FileText, RefreshCw, Sparkles, ShieldCheck, MessageSquare, BookOpen, Printer } from 'lucide-react';

export default function App() {
  const [documentText, setDocumentText] = useState<string>('');
  const [documentTypeFilter, setDocumentTypeFilter] = useState<string>('auto');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedClause, setSelectedClause] = useState<RiskyClause | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [activeTab, setActiveTab] = useState<'all' | 'summary' | 'highlights' | 'checklist' | 'chat'>('all');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [flashedClauseId, setFlashedClauseId] = useState<string | null>(null);

  const ui = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const handleSelectSample = (sample: SampleDoc) => {
    setDocumentText(sample.text);
    setErrorMessage(null);
    setAnalysis(null);
  };

  const handleLanguageChange = async (newLang: LanguageCode) => {
    setLanguage(newLang);

    if (analysis) {
      // 1. If it's a sample document, instantly switch to pre-translated version
      let sampleKey: string | null = null;
      if (documentText.includes('742 Evergreen Terrace') || documentText.includes('APEX REALTY')) {
        sampleKey = 'rental-agreement';
      } else if (documentText.includes('VALLEY MEMORIAL HEALTH') || documentText.includes('DIAGNOSTIC ARTHROSCOPY')) {
        sampleKey = 'medical-consent';
      } else if (documentText.includes('DEPARTMENT OF BUILDING & CODE') || documentText.includes('CITY OF METROPOLIS')) {
        sampleKey = 'government-notice';
      }

      if (sampleKey) {
        const base = SAMPLE_ANALYSES[sampleKey];
        const trans = SAMPLE_ANALYSES_TRANSLATED[newLang]?.[sampleKey] || {};
        setAnalysis({
          ...base,
          ...trans,
          language: newLang,
        });
        return;
      }

      // 2. For custom text, re-fetch with target language or update analysis language
      try {
        setIsLoading(true);
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentText,
            documentTypeFilter,
            language: newLang,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setAnalysis(data);
        } else {
          const fallback = generateRuleBasedAnalysis(documentText, newLang);
          setAnalysis(fallback);
        }
      } catch (err) {
        console.warn('Language switch translation fallback:', err);
        const fallback = generateRuleBasedAnalysis(documentText, newLang);
        setAnalysis(fallback);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSelectedClause(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentText,
          documentTypeFilter,
          language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: DocumentAnalysis = await response.json();
      setAnalysis(data);

      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.warn('API call encountered error, activating resilient fallback scanner:', err);
      try {
        let fallbackData: DocumentAnalysis;
        let sampleKey: string | null = null;

        if (documentText.includes('742 Evergreen Terrace') || documentText.includes('APEX REALTY')) {
          sampleKey = 'rental-agreement';
        } else if (documentText.includes('VALLEY MEMORIAL HEALTH') || documentText.includes('DIAGNOSTIC ARTHROSCOPY')) {
          sampleKey = 'medical-consent';
        } else if (documentText.includes('DEPARTMENT OF BUILDING & CODE') || documentText.includes('CITY OF METROPOLIS')) {
          sampleKey = 'government-notice';
        }

        if (sampleKey) {
          const base = SAMPLE_ANALYSES[sampleKey];
          const trans = SAMPLE_ANALYSES_TRANSLATED[language]?.[sampleKey] || {};
          fallbackData = { ...base, ...trans, language };
        } else {
          fallbackData = generateRuleBasedAnalysis(documentText, language);
        }

        setAnalysis(fallbackData);
        setTimeout(() => {
          const resultsEl = document.getElementById('results-section');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (fallbackErr) {
        setErrorMessage(
          err.message || 'Failed to analyze document. Please check your network and try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleJumpToClause = (clauseTrigger: string, clauseIdRef?: string) => {
    let targetClause = analysis?.riskyClauses.find((c) => c.id === clauseIdRef);
    if (!targetClause && analysis) {
      targetClause = analysis.riskyClauses.find((c) =>
        clauseTrigger.includes(c.exactQuote) || c.exactQuote.includes(clauseTrigger.slice(0, 30))
      );
    }

    if (targetClause) {
      setSelectedClause(targetClause);
      setFlashedClauseId(targetClause.id);
      setActiveTab('all');

      setTimeout(() => {
        const el = document.getElementById(`highlight-${targetClause!.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const viewer = document.getElementById('document-viewer');
          if (viewer) viewer.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);

      setTimeout(() => {
        setFlashedClauseId(null);
      }, 2500);
    } else {
      const viewer = document.getElementById('document-viewer');
      if (viewer) viewer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navigation & Controls */}
      <Header
        fontSize={fontSize}
        setFontSize={setFontSize}
        language={language}
        setLanguage={handleLanguageChange}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        hasGlossary={Boolean(analysis?.glossary && analysis.glossary.length > 0)}
        ui={ui}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero Banner / Explainer */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{ui.heroTaglineHighlight}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {ui.heroTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {ui.heroSubtitle}
          </p>
        </div>

        {/* Document Input Section */}
        <DocumentInput
          text={documentText}
          onChangeText={setDocumentText}
          documentType={documentTypeFilter}
          onChangeDocumentType={setDocumentTypeFilter}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          onSelectSample={handleSelectSample}
          ui={ui}
          language={language}
        />

        {/* Error message banner */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <strong className="font-bold">Analysis Error: </strong>
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={handleAnalyze}
              className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-colors shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Spinner & Status Steps */}
        {isLoading && <LoadingState />}

        {/* Analysis Results */}
        {analysis && !isLoading && (
          <div id="results-section" className="space-y-6 pt-2 animate-in fade-in duration-300">
            {/* Risk Gauge Bar */}
            <RiskGauge
              score={analysis.riskScore}
              verdict={analysis.riskVerdict}
              overallRiskLevel={analysis.overallRiskLevel}
              ui={ui}
            />

            {/* Deadline Detector Banner */}
            {analysis.deadlines && analysis.deadlines.length > 0 && (
              <DeadlinesDetector deadlines={analysis.deadlines} ui={ui} />
            )}

            {/* Quick Navigation Tabs & Print Bar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 flex-wrap gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {ui.allSections}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('summary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'summary'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {ui.plainWordsTab}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('highlights')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'highlights'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {ui.riskyClausesTab} ({analysis.riskyClauses.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('checklist')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'checklist'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {ui.actionPlanTab} ({analysis.actionChecklist.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('chat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 ${
                    activeTab === 'chat'
                      ? 'bg-indigo-700 text-white shadow-xs'
                      : 'text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{ui.askDocTab}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Print / Save PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{ui.printPdf}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  {ui.topBtn}
                </button>
              </div>
            </div>

            {/* 1. "In plain words": a short, simple summary */}
            {(activeTab === 'all' || activeTab === 'summary') && (
              <PlainWordsSummary analysis={analysis} fontSize={fontSize} language={language} ui={ui} />
            )}

            {/* 2. The original document with risky clauses highlighted in red, amber, yellow */}
            {(activeTab === 'all' || activeTab === 'highlights') && (
              <DocumentHighlighter
                documentText={documentText}
                riskyClauses={analysis.riskyClauses}
                selectedClauseId={selectedClause?.id || null}
                onSelectClause={(clause) => setSelectedClause(clause)}
                fontSize={fontSize}
                flashedClauseId={flashedClauseId}
                ui={ui}
              />
            )}

            {/* 3. "What to do next": action plan checklist with copy question & jump-to-clause */}
            {(activeTab === 'all' || activeTab === 'checklist') && (
              <ActionChecklist
                items={analysis.actionChecklist}
                fontSize={fontSize}
                onJumpToClause={handleJumpToClause}
                ui={ui}
              />
            )}

            {/* 4. Chat with your document */}
            {(activeTab === 'all' || activeTab === 'chat') && (
              <DocumentChat documentText={documentText} ui={ui} language={language} />
            )}
          </div>
        )}

        {/* Empty state when no analysis yet */}
        {!analysis && !isLoading && (
          <div className="bg-white/80 rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-lg mx-auto mt-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {ui.readyToDecode}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {ui.readySubtitle}
            </p>
            <button
              type="button"
              onClick={() => handleSelectSample(SAMPLE_RENTAL_AGREEMENT)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              {ui.loadSampleBtn}
            </button>
          </div>
        )}
      </main>

      {/* Clause Detail Modal (Clicked Highlight) */}
      <ClauseDetailModal
        clause={selectedClause}
        onClose={() => setSelectedClause(null)}
        fontSize={fontSize}
        ui={ui}
      />

      {/* Key Terms Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        terms={analysis?.glossary || []}
        ui={ui}
      />

      {/* Footer & Disclaimer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              JB
            </div>
            <span className="font-bold text-sm text-slate-900">{ui.appName}</span>
            <span className="text-xs text-slate-400">— {ui.badge}</span>
          </div>

          <div className="text-xs text-slate-500 max-w-md">
            <p className="font-semibold text-slate-700">
              {ui.disclaimer}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {ui.disclaimerDetail}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

