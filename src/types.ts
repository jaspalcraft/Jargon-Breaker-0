export type RiskSeverity = 'high' | 'amber' | 'yellow';

export interface RiskyClause {
  id: string;
  exactQuote: string;
  severity: RiskSeverity;
  category: string;
  riskExplanation: string;
  recommendedAction: string;
  potentialTrap?: string;
  startIndex?: number;
  endIndex?: number;
}

export interface ActionItem {
  id: string;
  action: string;
  triggeredByClause: string;
  urgency: 'urgent' | 'important' | 'recommended';
  category?: string;
  questionToAsk?: string; // Ready-to-ask line for landlord, doctor, or office
  clauseIdRef?: string;
}

export interface DocumentDeadline {
  id: string;
  title: string;
  timeframe: string; // e.g. "120 days prior to lease end", "7 business days"
  exactTrigger: string;
  consequenceIfMissed: string;
  suggestedCalendarDays?: number;
}

export interface GlossaryTerm {
  term: string;
  plainMeaning: string;
}

export interface DocumentAnalysis {
  documentType: string;
  documentTitle?: string;
  overallRiskLevel: 'low' | 'moderate' | 'high';
  riskScore: number; // 1 to 10
  riskVerdict: string; // One-line verdict, e.g. "Heavy Landlord Tilt — Do Not Sign As-Is"
  plainLanguageSummary: string;
  keyTakeaways: string[];
  riskyClauses: RiskyClause[];
  actionChecklist: ActionItem[];
  deadlines?: DocumentDeadline[];
  glossary?: GlossaryTerm[];
  analyzedAt: string;
  characterCount: number;
  matchedClausesCount: number;
  language?: 'en' | 'hi' | 'ta';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sourceQuote?: string;
  sourceClause?: string;
  notMentioned?: boolean;
  timestamp: string;
}
