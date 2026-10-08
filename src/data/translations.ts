import { DocumentAnalysis, RiskyClause, ActionItem, DocumentDeadline, GlossaryTerm } from '../types';

export type LanguageCode = 'en' | 'hi' | 'ta';

export interface UIStrings {
  appName: string;
  tagline: string;
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTaglineHighlight: string;
  pasteTitle: string;
  pasteSubtitle: string;
  docTypeLabel: string;
  autoDetect: string;
  rentalLease: string;
  medicalConsent: string;
  govtNotice: string;
  employmentNDA: string;
  tryExample: string;
  moreExamples: string;
  pasteBtn: string;
  clearBtn: string;
  analyzeBtn: string;
  analyzingBtn: string;
  noDataStored: string;
  chars: string;
  words: string;
  pressShortcut: string;
  noticeNotAdvice: string;
  glossaryBtn: string;
  fontSizeTitle: string;
  riskSeverity: string;
  highRisk: string;
  medRisk: string;
  lowRisk: string;
  standardRisk: string;
  predatoryRisk: string;
  riskLevelDisplay: string;
  allSections: string;
  plainWordsTab: string;
  riskyClausesTab: string;
  actionPlanTab: string;
  askDocTab: string;
  printPdf: string;
  topBtn: string;
  inPlainWordsTitle: string;
  detectedDoc: string;
  coreTakeaways: string;
  originalDocTitle: string;
  originalDocSubtitle: string;
  allFlags: string;
  tapColoredText: string;
  whatShouldIDoNext: string;
  actionSubtitle: string;
  actionProgress: string;
  ofDone: string;
  copyChecklist: string;
  copied: string;
  readyToAsk: string;
  copyQuestion: string;
  triggeredBy: string;
  jumpToClause: string;
  deadlineTitle: string;
  deadlinesSubtitle: string;
  riskIfMissed: string;
  googleCal: string;
  icsFile: string;
  askAnything: string;
  askSubtitle: string;
  tryAsking: string;
  askPlaceholder: string;
  askBtn: string;
  notMentioned: string;
  sourceLabel: string;
  chatInitial: string;
  chatSuggested1: string;
  chatSuggested2: string;
  chatSuggested3: string;
  chatSuggested4: string;
  disclaimer: string;
  disclaimerDetail: string;
  readyToDecode: string;
  readySubtitle: string;
  loadSampleBtn: string;
  clauseRiskBreakdown: string;
  exactClauseInDoc: string;
  whyRisky: string;
  potentialTrap: string;
  recommendedAction: string;
  doneBtn: string;
  closeBtn: string;
  viewNextSteps: string;
  categoryLabel: string;
  glossaryTitle: string;
  glossarySubtitle: string;
}

export const UI_TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    appName: 'Jargon Breaker',
    tagline: 'Plain-language summary, highlighted risk clauses, and action checklist',
    badge: 'AI Decoder',
    heroTitle: 'Cut through legal and medical double-talk.',
    heroSubtitle: 'Get an instant plain-language summary, see risky clauses highlighted, and get an action plan with questions to ask.',
    heroTaglineHighlight: 'Demystify Leases, Consent Forms, NDAs & Fines',
    pasteTitle: 'Paste Your Document',
    pasteSubtitle: 'Rental leases, surgical waivers, parking/code violations, terms of service, or insurance paperwork.',
    docTypeLabel: 'Type:',
    autoDetect: 'Auto-detect Document',
    rentalLease: 'Rental / Legal Lease',
    medicalConsent: 'Medical / Hospital Consent',
    govtNotice: 'Government / City Notice',
    employmentNDA: 'Employment / NDA',
    tryExample: 'Try example',
    moreExamples: 'More samples',
    pasteBtn: 'Paste',
    clearBtn: 'Clear',
    analyzeBtn: 'Analyze Document',
    analyzingBtn: 'Analyzing Document...',
    noDataStored: 'Zero data stored • AI reads only within your session',
    chars: 'chars',
    words: 'words',
    pressShortcut: 'Press Ctrl+Enter to analyze',
    noticeNotAdvice: 'Notice: Not advice',
    glossaryBtn: '📖 Glossary',
    fontSizeTitle: 'Text size',
    riskSeverity: 'Risk Severity Score',
    highRisk: 'High Risk',
    medRisk: 'Medium Risk',
    lowRisk: 'Low Risk',
    standardRisk: '1 (Standard)',
    predatoryRisk: '10 (Predatory)',
    riskLevelDisplay: 'Risk Level:',
    allSections: 'All Sections',
    plainWordsTab: '1. Plain Words',
    riskyClausesTab: '2. Risky Clauses',
    actionPlanTab: '3. Action Plan',
    askDocTab: 'Ask Document',
    printPdf: 'Print / PDF',
    topBtn: '↑ Top',
    inPlainWordsTitle: 'In Plain Words',
    detectedDoc: 'Detected:',
    coreTakeaways: 'Core Bottom-Line Takeaways',
    originalDocTitle: 'Original Document with Risky Clauses',
    originalDocSubtitle: 'Color-coded by risk: Red (High), Amber (Medium), Yellow (Low/Advisory).',
    allFlags: 'All',
    tapColoredText: 'Tap any colored text to read why it is risky.',
    whatShouldIDoNext: 'What Should I Do Next?',
    actionSubtitle: 'Prioritized action plan with ready-to-ask negotiation lines and click-to-jump clauses.',
    actionProgress: 'Action Progress',
    ofDone: 'of',
    copyChecklist: 'Copy Checklist',
    copied: 'Copied!',
    readyToAsk: '💬 Ready to ask:',
    copyQuestion: 'Copy question',
    triggeredBy: 'Triggered by clause:',
    jumpToClause: 'Jump to clause',
    deadlineTitle: 'Deadline Detector',
    deadlinesSubtitle: 'Missing legal notice windows or appeal dates can waive your rights. Calendar these critical deadlines:',
    riskIfMissed: 'Risk if missed:',
    googleCal: 'Google Calendar',
    icsFile: '.ICS File',
    askAnything: 'Chat with Your Document',
    askSubtitle: 'Strict grounded answers citing exact clauses. Tells you if a term is not in the text.',
    tryAsking: 'Try asking:',
    askPlaceholder: "Ask a question about this document (e.g. 'Can I have pets?')...",
    askBtn: 'Ask',
    notMentioned: 'ℹ️ Not mentioned in this document',
    sourceLabel: '📌 Source:',
    chatInitial: 'Ask me anything about this document! I will only answer using facts stated in the text, cite the exact source quote, or confirm if it is not mentioned.',
    chatSuggested1: 'Can the landlord enter without advance notice?',
    chatSuggested2: 'Who pays if the air conditioner or HVAC breaks?',
    chatSuggested3: 'What happens to the security deposit upon moving out?',
    chatSuggested4: 'Is there an automatic lease renewal?',
    disclaimer: 'Simplified explanation, not legal or medical advice.',
    disclaimerDetail: 'Jargon Breaker is an AI reading companion for informational purposes only. Consult a licensed attorney or physician for formal guidance.',
    readyToDecode: 'Ready to decode fine print',
    readySubtitle: 'Click "Try example" to load a residential lease packed with 24-month renewal traps, HVAC repair liabilities, and deposit forfeitures.',
    loadSampleBtn: 'Load Sample Rental Agreement',
    clauseRiskBreakdown: 'Risk Analysis Breakdown',
    exactClauseInDoc: 'Exact Clause in Document',
    whyRisky: 'Why This is Risky',
    potentialTrap: 'Potential Trap / Worst-Case Scenario',
    recommendedAction: 'Recommended Counter-Action or Request',
    doneBtn: 'Done',
    closeBtn: 'Close',
    viewNextSteps: 'View Next-Steps Checklist',
    categoryLabel: 'Category:',
    glossaryTitle: 'Key Legal & Medical Terms',
    glossarySubtitle: 'Plain definitions of confusing jargon found in this document',
  },
  hi: {
    appName: 'जार्गन ब्रेकर (Jargon Breaker)',
    tagline: 'सरल भाषा में सारांश, जोखिम भरे क्लॉज और जरूरी कदम',
    badge: 'एआई डिकोडर',
    heroTitle: 'कानूनी और मेडिकल कठिन भाषा को आसानी से समझें।',
    heroSubtitle: 'तुरंत सरल भाषा में सारांश प्राप्त करें, जोखिम भरे क्लॉज हाइलाइट देखें, और पूछने के लिए तैयार सवाल पाएं।',
    heroTaglineHighlight: 'किरायानामा, मेडिकल सहमति पत्र और सरकारी नोटिस डिकोड करें',
    pasteTitle: 'अपना दस्तावेज़ यहाँ पेस्ट करें',
    pasteSubtitle: 'किराया अनुबंध, सर्जिकल सहमति पत्र, नगर निगम नोटिस या सेवा शर्तें।',
    docTypeLabel: 'प्रकार:',
    autoDetect: 'स्वचालित पहचान (Auto-detect)',
    rentalLease: 'किरायानामा / लीज एग्रीमेंट',
    medicalConsent: 'मेडिकल / अस्पताल सहमति पत्र',
    govtNotice: 'सरकारी / नगर निगम नोटिस',
    employmentNDA: 'रोजगार अनुबंध / एनडीए',
    tryExample: 'उदाहरण देखें',
    moreExamples: 'अन्य नमूने',
    pasteBtn: 'पेस्ट करें',
    clearBtn: 'साफ़ करें',
    analyzeBtn: 'दस्तावेज़ का विश्लेषण करें',
    analyzingBtn: 'विश्लेषण हो रहा है...',
    noDataStored: 'कोई डेटा स्टोर नहीं होता • सुरक्षित व गोपनीय',
    chars: 'अक्षर',
    words: 'शब्द',
    pressShortcut: 'विश्लेषण के लिए Ctrl+Enter दबाएं',
    noticeNotAdvice: 'सूचना: कानूनी सलाह नहीं',
    glossaryBtn: '📖 शब्दावली',
    fontSizeTitle: 'अक्षर का आकार',
    riskSeverity: 'जोखिम गंभीरता स्कोर',
    highRisk: 'उच्च जोखिम (High Risk)',
    medRisk: 'मध्यम जोखिम (Medium Risk)',
    lowRisk: 'कम जोखिम (Low Risk)',
    standardRisk: '1 (मानक/सुरक्षित)',
    predatoryRisk: '10 (अत्यधिक जोखिम भरा)',
    riskLevelDisplay: 'जोखिम स्तर:',
    allSections: 'सभी भाग',
    plainWordsTab: '1. सरल शब्दों में',
    riskyClausesTab: '2. जोखिम भरे क्लॉज',
    actionPlanTab: '3. जरूरी कदम',
    askDocTab: 'दस्तावेज़ से पूछें',
    printPdf: 'प्रिंट / पीडीएफ',
    topBtn: '↑ ऊपर जाएं',
    inPlainWordsTitle: 'सरल शब्दों में सारांश',
    detectedDoc: 'पहचाना गया दस्तावेज़:',
    coreTakeaways: 'मुख्य मुख्य बातें',
    originalDocTitle: 'जोखिम भरे क्लॉज वाला मूल दस्तावेज़',
    originalDocSubtitle: 'रंग कोड: लाल (उच्च जोखिम), एम्बर (सावधानी), पीला (सलाह)।',
    allFlags: 'सभी',
    tapColoredText: 'कारण और बचाव जानने के लिए किसी भी रंगीन टेक्स्ट पर टैप करें।',
    whatShouldIDoNext: 'मुझे आगे क्या करना चाहिए?',
    actionSubtitle: 'प्राथमिकता अनुसार जरूरी कदमों की चेकलिस्ट और मकान मालिक/डॉक्टर से पूछने के लिए तैयार प्रश्न।',
    actionProgress: 'प्रगति स्थिति',
    ofDone: 'में से पूर्ण',
    copyChecklist: 'चेकलिस्ट कॉपी करें',
    copied: 'कॉपी हो गया!',
    readyToAsk: '💬 पूछने के लिए तैयार लाइन:',
    copyQuestion: 'सवाल कॉपी करें',
    triggeredBy: 'इस क्लॉज के कारण:',
    jumpToClause: 'क्लॉज पर जाएं',
    deadlineTitle: 'महत्वपूर्ण समय-सीमा (Deadline Detector)',
    deadlinesSubtitle: 'समय सीमा चूकने से आपके कानूनी अधिकार खत्म हो सकते हैं। इन्हें तुरंत कैलेंडर में जोड़ें:',
    riskIfMissed: 'चूकने पर नुकसान:',
    googleCal: 'गूगल कैलेंडर',
    icsFile: '.ICS फ़ाइल',
    askAnything: 'अपने दस्तावेज़ से सवाल पूछें',
    askSubtitle: 'केवल दस्तावेज़ के आधार पर सटीक उत्तर और क्लॉज का संदर्भ देता है।',
    tryAsking: 'यह पूछ कर देखें:',
    askPlaceholder: 'दस्तावेज़ के बारे में कोई भी सवाल पूछें (जैसे: किराया कब बढ़ेगा?)...',
    askBtn: 'पूछें',
    notMentioned: 'ℹ️ इस दस्तावेज़ में इसका उल्लेख नहीं है',
    sourceLabel: '📌 स्रोत क्लॉज:',
    chatInitial: 'इस दस्तावेज़ के बारे में कोई भी प्रश्न पूछें! मैं केवल दस्तावेज़ में लिखे तथ्यों के आधार पर उत्तर दूंगा।',
    chatSuggested1: 'क्या मकान मालिक बिना पूर्व सूचना के आ सकता है?',
    chatSuggested2: 'एसी या हीटर खराब होने पर मरम्मत का खर्च कौन देगा?',
    chatSuggested3: 'मकान खाली करते समय सुरक्षा जमा राशि (डिपॉजिट) का क्या होगा?',
    chatSuggested4: 'क्या अनुबंध का स्वतः नवीनीकरण (Auto-renewal) है?',
    disclaimer: 'सरल व्याख्या, कानूनी या चिकित्सकीय सलाह नहीं है।',
    disclaimerDetail: 'जार्गन ब्रेकर केवल आपकी समझ बढ़ाने के लिए एक एआई साथी है। बाध्यकारी निर्णयों के लिए योग्य वकील या डॉक्टर से परामर्श लें।',
    readyToDecode: 'बारीक शर्तों को डिकोड करने के लिए तैयार',
    readySubtitle: '24 महीने के ऑटो-रिन्यूअल और मरम्मत खर्चों से भरा नमूना किराया अनुबंध लोड करने के लिए "उदाहरण देखें" पर क्लिक करें।',
    loadSampleBtn: 'नमूना किराया अनुबंध लोड करें',
    clauseRiskBreakdown: 'जोखिम विश्लेषण विवरण',
    exactClauseInDoc: 'दस्तावेज़ में मूल क्लॉज',
    whyRisky: 'यह जोखिम भरा क्यों है',
    potentialTrap: 'संभावित जाल / सबसे खराब स्थिति',
    recommendedAction: 'सुझाया गया कदम या संशोधन अनुरोध',
    doneBtn: 'पूर्ण',
    closeBtn: 'बंद करें',
    viewNextSteps: 'अगले जरूरी कदम देखें',
    categoryLabel: 'श्रेणी:',
    glossaryTitle: 'मुख्य कानूनी एवं चिकित्सकीय शब्द',
    glossarySubtitle: 'इस दस्तावेज़ में उपयोग की गई कठिन शब्दावली का सरल अर्थ',
  },
  ta: {
    appName: 'ஜார்கன் பிரேக்கர் (Jargon Breaker)',
    tagline: 'எளிய மொழி சுருக்கம், ஆபத்தான விதிமுறைகள் மற்றும் அடுத்த கட்ட நடவடிக்கைகள்',
    badge: 'ஏஐ டிகோடர்',
    heroTitle: 'சட்ட மற்றும் மருத்துவக் கடினமான சொற்களை எளிதாகப் புரிந்து கொள்ளுங்கள்.',
    heroSubtitle: 'உடனடி எளிய மொழி சுருக்கம், ஆபத்தான விதிமுறைகளின் சிறப்பம்சங்கள் மற்றும் கேட்க வேண்டிய கேள்விகளுடன் கூடிய செயல் திட்டம்.',
    heroTaglineHighlight: 'வாடகை ஒப்பந்தங்கள், ஒப்புதல் படிவங்கள் & அபராதங்களை டிகோட் செய்யுங்கள்',
    pasteTitle: 'உங்கள் ஆவணத்தை இங்கே ஒட்டவும் (Paste)',
    pasteSubtitle: 'வாடகை ஒப்பந்தங்கள், அறுவைசிகிச்சை ஒப்புதல் படிவங்கள், நகராட்சி நோட்டீஸ் அல்லது சேவை விதிமுறைகள்.',
    docTypeLabel: 'வகை:',
    autoDetect: 'தானியங்கி கண்டறிதல் (Auto-detect)',
    rentalLease: 'வாடகை / குத்தகை ஒப்பந்தம்',
    medicalConsent: 'மருத்துவ / மருத்துவமனை ஒப்புதல் படிவம்',
    govtNotice: 'அரசு / நகராட்சி நோட்டீஸ்',
    employmentNDA: 'வேலைவாய்ப்பு ஒப்பந்தம் / NDA',
    tryExample: 'மாதிரியைப் பார்க்க',
    moreExamples: 'மேலும் மாதிரிகள்',
    pasteBtn: 'ஒட்டுக (Paste)',
    clearBtn: 'அழி (Clear)',
    analyzeBtn: 'ஆவணத்தை ஆராய்க',
    analyzingBtn: 'ஆராய்ச்சியில் உள்ளது...',
    noDataStored: 'தரவு சேமிக்கப்படுவதில்லை • பாதுகாப்பானது',
    chars: 'எழுத்துக்கள்',
    words: 'சொற்கள்',
    pressShortcut: 'ஆராய Ctrl+Enter அழுத்தவும்',
    noticeNotAdvice: 'அறிவிப்பு: சட்ட ஆலோசனை அல்ல',
    glossaryBtn: '📖 கலைச்சொற்கள்',
    fontSizeTitle: 'எழுத்து அளவு',
    riskSeverity: 'ஆபத்து தீவிரத்தன்மை மதிப்பீடு',
    highRisk: 'அதிக ஆபத்து (High Risk)',
    medRisk: 'நடுத்தர ஆபத்து (Medium Risk)',
    lowRisk: 'குறைந்த ஆபத்து (Low Risk)',
    standardRisk: '1 (வழக்கமானது)',
    predatoryRisk: '10 (சுரண்டல்/ஆபத்து)',
    riskLevelDisplay: 'ஆபத்து நிலை:',
    allSections: 'அனைத்து பிரிவுகள்',
    plainWordsTab: '1. எளிய சொற்களில்',
    riskyClausesTab: '2. ஆபத்தான விதிகள்',
    actionPlanTab: '3. செயல் திட்டம்',
    askDocTab: 'ஆவணத்திடம் கேட்க',
    printPdf: 'அச்சிடு / PDF',
    topBtn: '↑ மேலே செல்க',
    inPlainWordsTitle: 'எளிய சொற்களில் சுருக்கம்',
    detectedDoc: 'கண்டறியப்பட்ட ஆவணம்:',
    coreTakeaways: 'முக்கிய முக்கிய குறிப்புகள்',
    originalDocTitle: 'ஆபத்தான விதிகளுடன் கூடிய அசல் ஆவணம்',
    originalDocSubtitle: 'வண்ணக் குறியீடு: சிவப்பு (அதிக ஆபத்து), அம்பர் (எச்சரிக்கை), மஞ்சள் (ஆலோசனை).',
    allFlags: 'அனைத்தும்',
    tapColoredText: 'ஆபத்தின் காரணத்தை அறிய வண்ண உரையைத் தட்டவும்.',
    whatShouldIDoNext: 'நான் அடுத்து என்ன செய்ய வேண்டும்?',
    actionSubtitle: 'வீட்டு உரிமையாளர் அல்லது மருத்துவரிடம் கேட்கத் தயாரான கேள்விகளுடன் கூடிய செயல் திட்டம்.',
    actionProgress: 'முன்னேற்ற நிலை',
    ofDone: 'இல் முடிந்தது',
    copyChecklist: 'பட்டியலை நகலெடு',
    copied: 'நகலெடுக்கப்பட்டது!',
    readyToAsk: '💬 கேட்கத் தயாரான கேள்வி:',
    copyQuestion: 'கேள்வியை நகலெடு',
    triggeredBy: 'காரணமான விதிமுறை:',
    jumpToClause: 'விதிமுறைக்குச் செல்',
    deadlineTitle: 'முக்கிய காலக்கெடு (Deadline Detector)',
    deadlinesSubtitle: 'சட்டப்பூர்வ காலக்கெடுவை தவறவிட்டால் உங்கள் உரிமைகள் பறிபோகலாம். உடனே குறித்துக் கொள்ளுங்கள்:',
    riskIfMissed: 'தவறவிட்டால் ஏற்படும் இழப்பு:',
    googleCal: 'கூகிள் கேலெண்டர்',
    icsFile: '.ICS கோப்பு',
    askAnything: 'உங்கள் ஆவணத்திடம் கேள்வி கேளுங்கள்',
    askSubtitle: 'ஆவணத்தில் உள்ள உண்மைகளை மட்டுமே அடிப்படையாகக் கொண்டு துல்லியமான பதில் அளிக்கிறது.',
    tryAsking: 'இதை கேட்டுப் பாருங்கள்:',
    askPlaceholder: 'ஆவணம் பற்றி ஏதேனும் கேள்வி கேளுங்கள் (எ.கா: வாடகை எப்போது உயரும்?)...',
    askBtn: 'கேள்',
    notMentioned: 'ℹ️ இந்த ஆவணத்தில் இது குறிப்பிடப்படவில்லை',
    sourceLabel: '📌 ஆதார விதி:',
    chatInitial: 'இந்த ஆவணம் பற்றி எதையும் கேளுங்கள்! ஆவணத்தில் உள்ள உண்மைகளை மட்டுமே கொண்டு துல்லியமாக பதிலளிப்பேன்.',
    chatSuggested1: 'வீட்டு உரிமையாளர் முன்னறிவிப்பின்றி நுழைய முடியுமா?',
    chatSuggested2: 'ஏசி அல்லது ஹீட்டர் பழுதானால் செலவை யார் ஏற்பது?',
    chatSuggested3: 'வீட்டை காலி செய்யும்போது வைப்புத்தொகை (Deposit) என்னவாகும்?',
    chatSuggested4: 'தானியங்கி குத்தகை புதுப்பித்தல் உள்ளதா?',
    disclaimer: 'எளிமைப்படுத்தப்பட்ட விளக்கம், சட்ட அல்லது மருத்துவ ஆலோசனை அல்ல.',
    disclaimerDetail: 'ஜார்கன் பிரேக்கர் உங்களின் புரிதலுக்கான ஏஐ வழிகாட்டி மட்டுமே. அதிகாரப்பூர்வ முடிவுகளுக்கு வழக்கறிஞர் அல்லது மருத்துவரை அணுகவும்.',
    readyToDecode: 'ஆவணத்தை டிகோட் செய்ய தயார்',
    readySubtitle: '24 மாத தானியங்கி புதுப்பித்தல் மற்றும் பழுதுபார்ப்புப் பொறிகள் கொண்ட மாதிரி வாடகை ஒப்பந்தத்தை ஏற்ற "மாதிரியைப் பார்க்க" என்பதைக் கிளிக் செய்யவும்.',
    loadSampleBtn: 'மாதிரி வாடகை ஒப்பந்தத்தை ஏற்றுக',
    clauseRiskBreakdown: 'ஆபத்து பகுப்பாய்வு விவரம்',
    exactClauseInDoc: 'ஆவணத்தில் உள்ள அசல் விதிமுறை',
    whyRisky: 'இது ஏன் ஆபத்தானது',
    potentialTrap: 'சாத்தியமான பொறி / தீவிர ஆபத்து',
    recommendedAction: 'பரிந்துரைக்கப்பட்ட நடவடிக்கை / மாற்றம்',
    doneBtn: 'முடிந்தது',
    closeBtn: 'மூடுக',
    viewNextSteps: 'அடுத்த படிகளைப் பார்க்க',
    categoryLabel: 'பிரிவு:',
    glossaryTitle: 'முக்கிய சட்ட & மருத்துவக் கலைச்சொற்கள்',
    glossarySubtitle: 'இந்த ஆவணத்தில் பயன்படுத்தப்பட்ட கடினமான சொற்களின் எளிய விளக்கம்',
  },
};

// Comprehensive Translations for Sample Documents
export const SAMPLE_ANALYSES_TRANSLATED: Record<LanguageCode, Record<string, Partial<DocumentAnalysis>>> = {
  en: {},
  hi: {
    'rental-agreement': {
      documentType: 'आवासीय किराया अनुबंध (Residential Lease)',
      riskVerdict: 'मकान मालिक के अत्यधिक पक्ष में — धारा 1, 3 और 4 में संशोधन किए बिना हस्ताक्षर न करें',
      plainLanguageSummary: `यह किराया अनुबंध मकान मालिक के पक्ष में बहुत अधिक झुका हुआ है और इसमें कई वित्तीय नुकसान छिपे हैं। 

यदि आप 120 दिन पहले स्पीड पोस्ट/रजिस्टर्ड डाक से नोटिस नहीं भेजते हैं, तो यह आपको 25% बढ़े हुए किराए पर अगले 24 महीनों के लिए अपने आप बांध देता है। इसके अलावा, यह एसी कंप्रेसर और हीटर जैसी प्रमुख मशीनों के पूरे खर्चे को आप पर थोपता है, बिना पूर्व सूचना किसी भी समय मकान मालिक के प्रवेश की अनुमति देता है, और सामान्य टूट-फूट के लिए भी आपकी पूरी $4,900 की सुरक्षा जमा राशि जब्त करने का दावा करता है।`,
      keyTakeaways: [
        '120 दिन पूर्व रजिस्टर्ड डाक न भेजने पर 24 महीने के लिए 25% बढ़े किराए पर स्वतः नवीनीकरण।',
        'हजारों डॉलर के एसी/हीटर मैकेनिकल रिप्लेसमेंट का खर्च किराएदार पर थोपना।',
        'बिना किसी पूर्व सूचना के दिन या रात किसी भी समय मकान मालिक के घर में घुसने का अधिकार।',
        'सामान्य खरोंचों के लिए भी $4,900 की पूरी सिक्योरिटी डिपॉजिट तत्काल जब्त होना।',
        'विवाद होने पर डेलावेयर में $3,500 की गैर-वापसी योग्य मध्यस्थता फीस किराएदार द्वारा देय।'
      ],
      deadlines: [
        {
          id: 'dl-renew',
          title: 'गैर-नवीनीकरण हेतु रजिस्टर्ड डाक नोटिस',
          timeframe: 'पट्टा समाप्ति से 120 दिन पूर्व (2 अगस्त, 2027)',
          exactTrigger: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
          consequenceIfMissed: '25% बढ़े किराए ($3,062.50/माह) पर 24 महीने के लिए स्वतः नवीनीकरण।',
          suggestedCalendarDays: 120
        },
        {
          id: 'dl-rent-hike',
          title: 'एकतरफा किराया वृद्धि नोटिस विंडो',
          timeframe: 'ईमेल द्वारा केवल 14 दिन की अनौपचारिक सूचना',
          exactTrigger: '...upon fourteen (14) days informal email notice to offset rising building operational costs.',
          consequenceIfMissed: 'बिना किसी पुनर्विचार के किराया वृद्धि तुरंत लागू हो जाएगी।',
          suggestedCalendarDays: 14
        },
        {
          id: 'dl-guest',
          title: 'अतिथि ठहरने की अधिकतम सीमा (बेदखली चेतावनी)',
          timeframe: 'किसी भी 30-दिवसीय अवधि में कुल 48 घंटे',
          exactTrigger: 'Any visiting guest remaining in the Premises for more than forty-eight (48) cumulative hours... summary eviction.',
          consequenceIfMissed: 'अतिथि को अनधिकृत उप-किराएदार मानकर 24 घंटे में बेदखली नोटिस दिया जाएगा।',
          suggestedCalendarDays: 2
        }
      ],
      riskyClauses: [
        {
          id: 'clause-auto-renewal',
          exactQuote: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior to the expiration date, this Lease shall automatically renew for a subsequent fixed term of twenty-four (24) months at an increased monthly rent of twenty-five percent (25%).',
          severity: 'high',
          category: 'स्वतः नवीनीकरण जाल (Auto-Renewal Trap)',
          riskExplanation: '120 दिन का नोटिस समय मानक से दोगुना है, और इसे चूकने पर आप 25% बढ़े किराए के साथ अगले 2 पूरे वर्षों के लिए कानूनी रूप से बंध जाएंगे।',
          potentialTrap: 'यदि आप 90 दिन पहले भी बताते हैं, तो भी आप अगले 2 साल और $73,000 से अधिक किराए के भुगतान के लिए बाध्य होंगे।',
          recommendedAction: 'इस क्लॉज में संशोधन करवाएं कि 12 महीने बाद अनुबंध सामान्य 30 या 60 दिन के नोटिस के साथ महीने-दर-महीने (month-to-month) में बदल जाए।'
        },
        {
          id: 'clause-rent-increase',
          exactQuote: 'Landlord reserves the unilateral right to adjust monthly base rent at any time upon fourteen (14) days informal email notice to offset rising building operational costs.',
          severity: 'high',
          category: 'एकतरफा किराया वृद्धि (Unilateral Rent Hike)',
          riskExplanation: 'निश्चित अवधि के पट्टे का उद्देश्य किराए की स्थिरता देना होता है। यह क्लॉज मकान मालिक को केवल 2 सप्ताह के नोटिस पर मनमाना किराया बढ़ाने की छूट देता है।',
          potentialTrap: 'पट्टे के बीच में ही आपका किराया अप्रत्याशित रूप से बढ़ सकता है और आपको मजबूरी में भुगतान करना पड़ेगा।',
          recommendedAction: 'इस शर्त को पूरी तरह कटवा दें। पूरे 12 महीनों के लिए निश्चित किराया दर तय होनी चाहिए।'
        },
        {
          id: 'clause-deposit-forfeiture',
          exactQuote: 'Tenant acknowledges that any scratch, blemish, scuff, or normal wear and tear on flooring, countertops, or walls shall result in immediate and complete forfeiture of the entire security deposit without itemized accounting or receipt obligations by Landlord.',
          severity: 'high',
          category: 'सुरक्षा जमा राशि जब्ती (Deposit Forfeiture)',
          riskExplanation: 'कानूनन सामान्य टूट-फूट के लिए सुरक्षा जमा से कटौती नहीं की जा सकती और मकान मालिक को खर्चों की रसीदें देनी अनिवार्य होती हैं। यह क्लॉज दोनों अधिकारों को छीनता है।',
          potentialTrap: 'दीवार या फर्श पर छोटी सी खरोंच के लिए भी आपकी पूरी $4,900 की जमा राशि बिना किसी बिल के जब्त कर ली जाएगी।',
          recommendedAction: 'इस क्लॉज को हटाएं और मानक कानूनी शर्त लिखवाएं कि 21 दिनों के भीतर बिलों के साथ शेष राशि वापस की जाएगी।'
        },
        {
          id: 'clause-hvac-maintenance',
          exactQuote: 'Tenant explicitly covenants to assume full financial responsibility for all mechanical systems, including replacement or overhaul of the furnace, HVAC compressor, water heater, and electrical wiring, irrespective of pre-existing age or natural component failure.',
          severity: 'high',
          category: 'पूंजीगत खर्च किराएदार पर (HVAC Capital Shift)',
          riskExplanation: 'एसी कंप्रेसर या हीटर बदलने में $3,000–$8,000 का खर्च आता है। मकान मालिक की स्थायी संपत्ति के सुधार का खर्च किराएदार पर डालना अनुचित व शोषणकारी है।',
          potentialTrap: 'यदि सर्दियों में 15 साल पुराना हीटर खराब होता है, तो मकान मालिक नया हीटर लगवाने का $6,000 का बिल आपसे वसूलेगा।',
          recommendedAction: 'मैकेनिकल व ढांचागत उपकरणों के लिए किराएदार की देयता पूरी तरह खत्म करें; मकान मालिक की मरम्मत जिम्मेदारी तय करें।'
        },
        {
          id: 'clause-entry-unrestricted',
          exactQuote: 'Landlord and Landlord\'s designated agents, contractors, and prospective buyers reserve the absolute right to enter the Premises at any hour of the day or night without prior notification to Tenant, and Landlord may retain and duplicate Tenant\'s personal keys without consent.',
          severity: 'high',
          category: 'अप्रतिबंधित प्रवेश (Unrestricted Entry)',
          riskExplanation: 'यह आपकी निजता और शांतिपूर्ण जीवन के मौलिक अधिकार का उल्लंघन करता है। मानक नियमों में कम से कम 24 से 48 घंटे पूर्व लिखित सूचना आवश्यक होती है।',
          potentialTrap: 'कोई भी ठेकेदार या अजनबी बिना किसी पूर्व सूचना के आधी रात को भी आपके घर में प्रवेश कर सकता है।',
          recommendedAction: 'गैर-आपातकालीन जांच के लिए सामान्य कार्य घंटों के दौरान कम से कम 24 घंटे पूर्व लिखित सूचना अनिवार्य करवाएं।'
        },
        {
          id: 'clause-arbitration',
          exactQuote: 'All disputes arising under this agreement must be submitted to binding private arbitration located in Wilmington, Delaware, with all initial non-refundable administrative filing fees of $3,500.00 paid solely by Tenant.',
          severity: 'amber',
          category: 'बाध्यकारी मध्यस्थता (Binding Arbitration)',
          riskExplanation: 'आपको स्थानीय अदालत जाने से रोकता है और $3,500 की भारी अग्रिम फीस थोपता है, जिससे छोटे दावों के लिए न्याय पाना असंभव हो जाता है।',
          potentialTrap: 'यदि मकान मालिक आपका डिपॉजिट हड़प ले, तो केस लड़ने में विवादित राशि से ज्यादा खर्च हो जाएगा।',
          recommendedAction: 'स्थानीय स्मॉल क्लेम्स कोर्ट (लघु वाद न्यायालय) में विवाद सुलझाने का अधिकार सुरक्षित रखें।'
        },
        {
          id: 'clause-guest-stay',
          exactQuote: 'Any visiting guest remaining in the Premises for more than forty-eight (48) cumulative hours within any thirty-day period shall be deemed an unauthorized subtenant, subjecting Tenant to immediate 24-hour summary eviction.',
          severity: 'yellow',
          category: 'सख्त अतिथि प्रतिबंध (Guest Limitation)',
          riskExplanation: '30 दिनों में केवल 48 घंटे का अतिथि नियम अत्यंत कठोर है; एक सप्ताहांत के लिए आए मित्र के कारण भी नोटिस आ सकता है।',
          potentialTrap: 'परिवार का कोई सदस्य मिलने आए तो मकान मालिक इसे अनुबंध का उल्लंघन बता सकता है।',
          recommendedAction: 'अतिथि सीमा को लगातार 14 दिन या वर्ष में 21 दिन का मानक करवाने का अनुरोध करें।'
        }
      ],
      actionChecklist: [
        {
          id: 'act-hvac',
          action: 'हस्ताक्षर करने से पहले धारा 4 के मैकेनिकल रिप्लेसमेंट क्लॉज को हटाने की मांग करें।',
          triggeredByClause: 'Tenant explicitly covenants to assume full financial responsibility for all mechanical systems...',
          urgency: 'urgent',
          category: 'संशोधन (Negotiate)',
          questionToAsk: 'नमस्ते, धारा 4 के संबंध में: एक किराएदार के रूप में मैं पुराने हीटर या एसी कंप्रेसर के पूंजीगत खर्च को वहन नहीं कर सकता। क्या हम इसे स्पष्ट कर सकते हैं कि सभी ढांचागत और मैकेनिकल प्रणालियों का रखरखाव मकान मालिक करेगा?',
          clauseIdRef: 'clause-hvac-maintenance'
        },
        {
          id: 'act-auto-renew',
          action: '120 दिन की रजिस्टर्ड डाक सूचना और 24 महीने के स्वतः नवीनीकरण दंड को कटवाएं।',
          triggeredByClause: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
          urgency: 'urgent',
          category: 'संशोधन (Negotiate)',
          questionToAsk: 'क्या हम धारा 1 में संशोधन कर सकते हैं ताकि 12 महीने बाद अनुबंध सामान्य 60 दिन के ईमेल नोटिस के साथ महीने-दर-महीने नवीनीकरण में बदल जाए?',
          clauseIdRef: 'clause-auto-renewal'
        },
        {
          id: 'act-deposit',
          action: 'मकान में प्रवेश के पहले दिन सभी दीवारों, फर्श और उपकरणों की विस्तृत फोटो और वीडियो रिकॉर्डिंग बनाएं।',
          triggeredByClause: 'Tenant acknowledges that any scratch, blemish, scuff, or normal wear and tear... immediate and complete forfeiture...',
          urgency: 'urgent',
          category: 'दस्तावेजीकरण (Record)',
          questionToAsk: 'क्या हम लिखित में पुष्टि कर सकते हैं कि सुरक्षा जमा कटौती के लिए मदवार बिल (Itemized Receipt) अनिवार्य होगा और सामान्य टूट-फूट को छूट दी जाएगी?',
          clauseIdRef: 'clause-deposit-forfeiture'
        },
        {
          id: 'act-notice-entry',
          action: 'मकान मालिक या ठेकेदार के आने से पूर्व कम से कम 24 घंटे की लिखित सूचना की शर्त जुड़वाएं।',
          triggeredByClause: '...reserve the absolute right to enter the Premises at any hour of the day or night without prior notification...',
          urgency: 'important',
          category: 'संशोधन (Negotiate)',
          questionToAsk: 'धारा 5 में, क्या हम गैर-आपातकालीन जांच के लिए कार्य दिवसों में 24 घंटे की पूर्व लिखित सूचना का मानक प्रावधान शामिल कर सकते हैं?',
          clauseIdRef: 'clause-entry-unrestricted'
        },
        {
          id: 'act-calendar',
          action: 'पट्टा खत्म होने से 150 दिन और 130 दिन पहले का कैलेंडर रिमाइंडर और फोन अलार्म सेट करें।',
          triggeredByClause: '...written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
          urgency: 'important',
          category: 'कैलेंडर (Calendar)',
          questionToAsk: 'पट्टा नवीनीकरण या प्रस्थान की सूचना भेजने के लिए आधिकारिक डाक पता और ईमेल क्या है?',
          clauseIdRef: 'clause-auto-renewal'
        }
      ],
      glossary: [
        { term: 'Per Diem', plainMeaning: 'दैनिक आधार पर लगने वाला जुर्माना या शुल्क जो भुगतान तक प्रतिदिन जुड़ता रहता है।' },
        { term: 'Summary Eviction', plainMeaning: 'किराएदार को न्यूनतम नोटिस पर तुरंत बाहर निकालने की त्वरित कानूनी प्रक्रिया।' },
        { term: 'Arbitration (मध्यस्थता)', plainMeaning: 'अदालत के बाहर निजी मध्यस्थ के समक्ष विवाद सुलझाना जिसका निर्णय कानूनी रूप से बाध्यकारी होता है।' },
        { term: 'Covenants (प्रतिज्ञाएं)', plainMeaning: 'औपचारिक कानूनी वादे या बाध्यकारी दायित्व जिन्हें पूरा करने का आप वचन देते हैं।' }
      ]
    },
    'medical-consent': {
      documentType: 'चिकित्सा सहमति एवं वित्तीय छूट पत्र (Medical Consent)',
      riskVerdict: 'अप्रत्याशित आउट-ऑफ-नेटवर्क बिलिंग और लापरवाही छूट की शर्तें मौजूद',
      plainLanguageSummary: `यह मेडिकल सहमति पत्र बहुत खतरनाक वित्तीय और कानूनी शर्तों से भरा है। यह आउट-ऑफ-नेटवर्क डॉक्टरों के अप्रत्याशित बिलों से मिलने वाले कानूनी संरक्षण को समाप्त कर देता है, जिससे आप स्वतंत्र एनेस्थेटिस्ट या रेडियोलॉजिस्ट के पूरे बिल के लिए स्वयं उत्तरदायी हो सकते हैं। इसके अलावा, यह अस्पताल को चिकित्सा लापरवाही के दावों से मुक्त करता है और आपके जैविक ऊतकों व सर्जिकल वीडियो पर व्यावसायिक प्रचार अधिकार मांगता है।`,
      keyTakeaways: [
        'सरप्राइज बिलिंग सुरक्षा का त्याग, जिससे गैर-नेटवर्क डॉक्टरों के 100% खर्च के लिए आप जिम्मेदार हैं।',
        'अस्पताल व डॉक्टरों को किसी भी प्रकार की चिकित्सीय लापरवाही से कानूनी उन्मुक्ति देना।',
        'आपके निकाले गए जैविक ऊतकों और डीएनए के सभी व्यावसायिक अधिकार अस्पताल को सौंपना।',
        'सार्वजनिक सोशल मीडिया पर बिना धुंधला किए सर्जरी वीडियो पोस्ट करने की सहमति मांगना।'
      ],
      deadlines: [
        {
          id: 'dl-insurance-preauth',
          title: 'इन-नेटवर्क डॉक्टर सत्यापन समय-सीमा',
          timeframe: 'अस्पताल में भर्ती होने के दिन से पहले',
          exactTrigger: 'Patient acknowledges that independent contracting physicians... do not participate in Patient\'s primary insurance network.',
          consequenceIfMissed: 'गैर-नेटवर्क डॉक्टरों के 100% अप्रत्याशित बिलों का पूरा भुगतान स्वयं करना होगा।',
          suggestedCalendarDays: 3
        }
      ],
      riskyClauses: [
        {
          id: 'med-surprise-billing',
          exactQuote: 'Patient explicitly agrees to accept complete personal financial responsibility for all balance-billed charges at 100% of the Hospital\'s master gross charge list, waiving any statutory surprise medical billing caps.',
          severity: 'high',
          category: 'अप्रत्याशित आउट-ऑफ-नेटवर्क बिलिंग (Surprise Billing)',
          riskExplanation: 'सरप्राइज बिलिंग सुरक्षा त्यागने से आप गैर-नेटवर्क विशेषज्ञों द्वारा लगाए गए हजारों डॉलर के अत्यधिक शुल्कों के जोखिम में आ जाते हैं।',
          potentialTrap: 'कोई स्वतंत्र एनेस्थेटिस्ट आपको $8,000 का बिल सीधे भेज सकता है, जिसे बीमा कंपनी कवर करने से मना कर देगी।',
          recommendedAction: 'इस वाक्य को काटें और लिखें: "मरीज केवल नो सरप्राइजेज एक्ट के तहत इन-नेटवर्क दरों से सहमत है।"'
        },
        {
          id: 'med-negligence-waiver',
          exactQuote: 'Patient forever releases and discharges Hospital, its executives, attending physicians, and vendor representatives from any and all liability for personal injury, hospital-acquired bacterial infections, procedural errors, equipment malfunction, or nerve damage, whether caused by ordinary negligence or systemic facility oversight.',
          severity: 'high',
          category: 'लापरवाही से उन्मुक्ति (Malpractice Waiver)',
          riskExplanation: 'चिकित्सकीय लापरवाही या उपकरण खराबी के लिए अस्पताल और डॉक्टरों को कानूनी जवाबदेही से मुक्त करना खतरनाक और अनुचित है।',
          potentialTrap: 'यदि ऑपरेशन के दौरान उपकरण खराब होने से नुकसान होता है, तो यह छूट आपके मुआवजे के दावे को खारिज करवा देगी।',
          recommendedAction: 'हस्ताक्षर करने से पहले धारा 3 पर एक सीधी रेखा खींचकर काटें और पास में अपने हस्ताक्षर करें।'
        },
        {
          id: 'med-media-release',
          exactQuote: 'Furthermore, Patient consents to unredacted video and photographic recording of the procedure for worldwide promotional and educational distribution across public digital media channels without compensation or anonymity.',
          severity: 'amber',
          category: 'सार्वजनिक वीडियो रिकॉर्डिंग सहमति (Media Release)',
          riskExplanation: 'अस्पताल को सोशल मीडिया पर बिना चेहरा या पहचान छिपाए आपकी सर्जरी का वीडियो पोस्ट करने की अनुमति देता है।',
          potentialTrap: 'आपकी सर्जरी की फुटेज सार्वजनिक प्रचार अभियानों या विज्ञापनों में दिखाई दे सकती है।',
          recommendedAction: 'धारा 4 को पूरी तरह काटें और लिखें: "कोई फोटो या वीडियो सहमति नहीं दी गई है।"'
        },
        {
          id: 'med-unforeseen-expansion',
          exactQuote: 'I acknowledge that during the operation, unforeseen conditions may necessitate additional or altered procedures, and I grant unconditional consent to any amputation, excision, or surgical variation deemed convenient by the attending staff.',
          severity: 'yellow',
          category: 'अनावश्यक सर्जिकल विस्तार (Unforeseen Procedure)',
          riskExplanation: 'आपातकालीन आवश्यकता के बजाय कर्मचारियों की "सुविधा" के आधार पर सर्जरी में फेरबदल करने की खुली छूट मांगता है।',
          potentialTrap: 'सर्जन बिना पूर्व चर्चा के कोई गैर-आपातकालीन अतिरिक्त अंग-उच्छेदन कर सकता है।',
          recommendedAction: '"सुविधाजनक" शब्द को काटकर "आपातकाल में जीवन रक्षक या चिकित्सकीय रूप से अनिवार्य" करवाएं।'
        }
      ],
      actionChecklist: [
        {
          id: 'act-cross-billing',
          action: 'धारा 2 में सरप्राइज मेडिकल बिलिंग सुरक्षा के त्याग को काटें।',
          triggeredByClause: 'Patient explicitly agrees to accept complete personal financial responsibility...',
          urgency: 'urgent',
          category: 'स्पष्टीकरण (Clarify)',
          questionToAsk: 'क्या आप लिखित में पुष्टि कर सकते हैं कि मेरी प्रक्रिया में भाग लेने वाले सभी एनेस्थेटिस्ट और सर्जिकल स्टाफ मेरे बीमा नेटवर्क से जुड़े हैं?',
          clauseIdRef: 'med-surprise-billing'
        },
        {
          id: 'act-strike-negligence',
          action: 'धारा 3 को काटें जो अस्पताल को चिकित्सा लापरवाही और संक्रमण की देयता से मुक्त करती है।',
          triggeredByClause: 'Patient forever releases and discharges Hospital... from any and all liability...',
          urgency: 'urgent',
          category: 'संशोधन (Negotiate)',
          questionToAsk: 'मैं लापरवाही से छूट वाली धारा 3 को काट रहा हूँ; सामान्य मरीज सहमति में कदाचार के विरुद्ध जवाबदेही नहीं छोड़ी जाती। क्या आप इस पर हस्ताक्षर कर सकते हैं?',
          clauseIdRef: 'med-negligence-waiver'
        },
        {
          id: 'act-media-opt-out',
          action: 'विपणन फोटोग्राफी और सार्वजनिक वीडियो प्रसारण की सहमति को अस्वीकार करें।',
          triggeredByClause: '...unredacted video and photographic recording of the procedure for worldwide promotional...',
          urgency: 'important',
          category: 'गोपनीयता (Privacy)',
          questionToAsk: 'कृपया नोट करें कि मैं किसी भी सार्वजनिक सोशल मीडिया या प्रचार रिकॉर्डिंग की अनुमति नहीं देता। क्या इसे रिकॉर्ड में दर्ज कर लिया गया है?',
          clauseIdRef: 'med-media-release'
        }
      ],
      glossary: [
        { term: 'Balance Billing', plainMeaning: 'बीमा कंपनी द्वारा स्वीकृत राशि और डॉक्टर द्वारा मांगी गई मूल फीस के बीच के अंतर का बिल मरीज से वसूलना।' },
        { term: 'Informed Consent', plainMeaning: 'प्रक्रिया के सभी जोखिमों और विकल्पों को समझने के बाद दी जाने वाली स्वैच्छिक सहमति।' },
        { term: 'Waiver of Liability', plainMeaning: 'नुकसान या चोट होने पर अस्पताल या डॉक्टर पर मुकदमा न करने का कानूनी वादा।' }
      ]
    },
    'government-notice': {
      documentType: 'नगर निगम प्रशासनिक नोटिस (Municipal Citation)',
      riskVerdict: 'समय-संवेदनशील कानूनी नोटिस — प्रतिदिन $500 का चक्रवृद्धिकारी जुर्माना व नीलामी का खतरा',
      plainLanguageSummary: `यह एक अत्यंत आवश्यक नगर निगम नोटिस है। आपको कथित दोषों को ठीक करने के लिए केवल 7 कार्यदिवस दिए गए हैं, जिसके बाद $500 प्रति दिन का जुर्माना साप्ताहिक रूप से चक्रवृद्धि ब्याज की तरह बढ़ना शुरू हो जाएगा। अपील केवल 10 दिनों के भीतर व्यक्तिगत रूप से $450 के बैंक ड्राफ्ट के साथ ही की जा सकती है; डाक या ईमेल से भेजी गई अपीलें खारिज कर दी जाएंगी। 30 दिन तक भुगतान न करने पर संपत्ति पर कर ग्रहणाधिकार (Tax Lien) लगाकर नीलामी की जा सकती है।`,
      keyTakeaways: [
        'दोषों को सुधारने के लिए सख्त 7 कार्यदिवस, अन्यथा प्रतिदिन $500 का भारी जुर्माना।',
        'अपील केवल 10 दिनों में व्यक्तिगत रूप से $450 के बैंक ड्राफ्ट के साथ सिटी हॉल में स्वीकार्य।',
        'ईमेल या साधारण डाक से भेजी गई अपीलों को बिना विचार किए रद्द कर दिया जाएगा।',
        '30 दिनों के भीतर संपत्ति पर टैक्स लियन लगाकर सार्वजनिक नीलामी की जा सकती है।'
      ],
      deadlines: [
        {
          id: 'dl-cure-period',
          title: 'दोष सुधार की अंतिम समय-सीमा (Cure Period)',
          timeframe: 'नोटिस प्राप्ति से 7 कार्यदिवस (शुक्रवार सायं 5 बजे)',
          exactTrigger: 'Violations must be fully abated and certified... within seven (7) business days.',
          consequenceIfMissed: 'प्रतिदिन $500 का जुर्माना शुरू होगा जो साप्ताहिक रूप से चक्रवृद्धि होगा।',
          suggestedCalendarDays: 7
        },
        {
          id: 'dl-appeal-window',
          title: 'व्यक्तिगत अपील दाखिल करने की समय-सीमा',
          timeframe: 'कैलेंडर के अनुसार 10 दिन',
          exactTrigger: 'Formal appeal must be submitted in person... within ten (10) calendar days.',
          consequenceIfMissed: 'अपील का अधिकार हमेशा के लिए समाप्त हो जाएगा और जुर्माना निर्विवाद माना जाएगा।',
          suggestedCalendarDays: 10
        }
      ],
      riskyClauses: [
        {
          id: 'gov-daily-penalty',
          exactQuote: 'Failure to achieve compliance within seven (7) business days shall result in an administrative civil penalty of $500.00 per calendar day, compounding weekly, without requirement of additional judicial process.',
          severity: 'high',
          category: 'चक्रवृद्धिकारी दैनिक जुर्माना (Compounding Penalties)',
          riskExplanation: 'प्रतिदिन $500 का जुर्माना साप्ताहिक रूप से बढ़ता है, जो एक महीने में $20,000 से अधिक हो सकता है।',
          potentialTrap: 'मामूली देरी भी भारी वित्तीय संकट पैदा कर सकती है।',
          recommendedAction: 'तुरंत 30-दिवसीय अनुपालन विस्तार (Compliance Extension) का औपचारिक अनुरोध दर्ज करें।'
        },
        {
          id: 'gov-in-person-appeal',
          exactQuote: 'Appeals submitted via standard postal mail, electronic mail, or telephone shall be deemed null, void, and untimely.',
          severity: 'high',
          category: 'सख्त अपील प्रक्रिया (Strict Appeal Rules)',
          riskExplanation: 'ईमेल या डाक से भेजी गई अपीलों को सीधे खारिज कर दिया जाएगा; केवल व्यक्तिगत उपस्थिति मान्य है।',
          potentialTrap: 'आप सोचेंगे कि आपने ईमेल से अपील कर दी है, जबकि समय सीमा समाप्त होकर जुर्माना शुरू हो चुका होगा।',
          recommendedAction: 'सिटी हॉल में स्वयं जाकर रसीद के साथ अपील पत्र जमा करें।'
        }
      ],
      actionChecklist: [
        {
          id: 'act-file-extension',
          action: 'जुर्माना रोकने के लिए तुरंत 30 दिन का समय विस्तार (Extension) आवेदन जमा करें।',
          triggeredByClause: 'Failure to achieve compliance within seven (7) business days...',
          urgency: 'urgent',
          category: 'अपील (Appeal)',
          questionToAsk: 'हम सुधार कार्य करा रहे हैं, क्या हम कार्य पूरा होने तक जुर्माने पर रोक लगाने के लिए 30 दिन का समय विस्तार ले सकते हैं?',
          clauseIdRef: 'gov-daily-penalty'
        }
      ],
      glossary: [
        { term: 'Tax Lien', plainMeaning: 'संपत्ति पर कानूनी दावा जो अवैतनिक जुर्माने के कारण संपत्ति की बिक्री या नीलामी करवा सकता है।' },
        { term: 'Abatement', plainMeaning: 'नगर निगम नियमों के अनुसार उल्लंघन या दोष को पूरी तरह ठीक करना।' },
        { term: 'Summary Process', plainMeaning: 'न्यायिक सुनवाई के बिना प्रशासनिक स्तर पर तुरंत की जाने वाली कार्रवाई।' }
      ]
    }
  },
  ta: {
    'rental-agreement': {
      documentType: 'குடியிருப்பு வாடகை ஒப்பந்தம் (Residential Lease)',
      riskVerdict: 'வீட்டு உரிமையாளருக்கு அதிக சாதகமானது — பிரிவு 1, 3 & 4 ஐ திருத்தாமல் கையெழுத்திடாதீர்கள்',
      plainLanguageSummary: `இந்த வாடகை ஒப்பந்தம் வீட்டு உரிமையாளருக்கு மிகவும் சாதகமாகவும், பல மறைமுக நிதிப் பொறிகளுடனும் உருவாக்கப்பட்டுள்ளது.

குத்தகை முடிவதற்கு 120 நாட்களுக்கு முன்பு பதிவுத் தபாலில் தெரிவிக்கத் தவறினால், 25% கூடுதல் வாடகையுடன் மேலும் இரண்டு ஆண்டுகளுக்கு (24 மாதங்கள்) இந்த ஒப்பந்தம் தானாகவே புதுப்பிக்கப்படும். மேலும், ஏசி கம்ப்ரசர் மற்றும் வாட்டர் ஹீட்டர் போன்ற இயந்திரப் பழுதுபார்ப்புச் செலவுகளை வாடகைதாரர் மீது சுமத்துகிறது, முன்னறிவிப்பின்றி எந்த நேரத்திலும் நுழைய அனுமதிக்கிறது, மற்றும் சாதாரண கீறல்களுக்கு கூட $4,900 வைப்புத்தொகையை முழுமையாக பறிமுதல் செய்ய முற்படுகிறது.`,
      keyTakeaways: [
        '120 நாட்களுக்கு முன் பதிவுத் தபால் அனுப்பாவிடில் 25% கூடுதல் வாடகையில் 24 மாத தானியங்கி புதுப்பித்தல்.',
        'ஆயிரக்கணக்கான டாலர் மதிப்புள்ள இயந்திர/ஏசி பழுதுபார்ப்புச் செலவுகளை வாடகைதாரர் மீது சுமத்துதல்.',
        'முன்னறிவிப்பு இன்றி பகல் அல்லது இரவில் எந்த நேரத்திலும் வீட்டுக்குள் நுழைய உரிமையாளருக்கு உரிமை.',
        'சாதாரண தேய்மானத்திற்குக் கூட $4,900 வைப்புத்தொகையை முழுமையாகப் பறிமுதல் செய்தல்.',
        'சர்ச்சை ஏற்பட்டால் $3,500 கட்டணத்துடன் டெலாவேரில் தனியார் நடுவர் மன்றத்தில் மட்டுமே முறையிட முடியும்.'
      ],
      deadlines: [
        {
          id: 'dl-renew',
          title: 'புதுப்பிக்காததற்கான பதிவுத் தபால் அறிவிப்பு',
          timeframe: 'குத்தகை முடிவதற்கு 120 நாட்களுக்கு முன் (ஆகஸ்ட் 2, 2027)',
          exactTrigger: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
          consequenceIfMissed: '25% கூடுதல் வாடகையுடன் ($3,062.50/மாதம்) தானாக 24 மாதங்கள் புதுப்பிக்கப்படும்.',
          suggestedCalendarDays: 120
        },
        {
          id: 'dl-rent-hike',
          title: 'ஒருதலைப்பட்ச வாடகை உயர்வு அறிவிப்பு அவகாசம்',
          timeframe: 'மின்னஞ்சல் மூலம் 14 நாட்கள் முன்னறிவிப்பு',
          exactTrigger: '...upon fourteen (14) days informal email notice to offset rising building operational costs.',
          consequenceIfMissed: 'எந்தவொரு பேச்சுவார்த்தையுமின்றி வாடகை உயர்வு உடனடியாக நடைமுறைக்கு வரும்.',
          suggestedCalendarDays: 14
        },
        {
          id: 'dl-guest',
          title: 'விருந்தினர் தங்கும் கால வரம்பு (வெளியேற்ற எச்சரிக்கை)',
          timeframe: '30 நாள் காலப்பகுதியில் மொத்தம் 48 மணிநேரம்',
          exactTrigger: 'Any visiting guest remaining in the Premises for more than forty-eight (48) cumulative hours... summary eviction.',
          consequenceIfMissed: 'அனுமதியற்ற உள்வாடகைதாரராகக் கருதப்பட்டு 24 மணி நேர வெளியேற்ற நோட்டீஸ் தரப்படும்.',
          suggestedCalendarDays: 2
        }
      ],
      riskyClauses: [
        {
          id: 'clause-auto-renewal',
          exactQuote: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior to the expiration date, this Lease shall automatically renew for a subsequent fixed term of twenty-four (24) months at an increased monthly rent of twenty-five percent (25%).',
          severity: 'high',
          category: 'தானியங்கி புதுப்பித்தல் பொறி (Auto-Renewal Trap)',
          riskExplanation: '120 நாட்கள் அறிவிப்பு என்பது வழக்கத்தை விட இரு மடங்கு அதிகம். இதைத் தவறவிட்டால் 25% அதிக வாடகையுடன் அடுத்த 2 ஆண்டுகளுக்கு நீங்கள் சட்டப்படி மாட்டிக்கொள்வீர்கள்.',
          potentialTrap: '90 நாட்களுக்கு முன் நீங்கள் கூறினாலும், மேலும் 2 ஆண்டுகள் $73,000 க்கும் அதிகமான வாடகை செலுத்த வேண்டிய கட்டாயம் ஏற்படும்.',
          recommendedAction: '12 மாதங்களுக்குப் பிறகு சாதாரண 30 அல்லது 60 நாள் மின்னஞ்சல் அறிவிப்புடன் மாதம் தோறும் புதுப்பிக்கும் முறையாக மாற்றக் கோருங்கள்.'
        },
        {
          id: 'clause-rent-increase',
          exactQuote: 'Landlord reserves the unilateral right to adjust monthly base rent at any time upon fourteen (14) days informal email notice to offset rising building operational costs.',
          severity: 'high',
          category: 'ஒருதலைப்பட்ச வாடகை உயர்வு (Unilateral Rent Hike)',
          riskExplanation: 'குறிப்பிட்ட கால குத்தகை வாடகை நிலைத்தன்மையை அளிக்க வேண்டும். இந்த விதி உரிமையாளருக்கு 2 வார அறிவிப்பில் வாடகையை விருப்பம்போல் உயர்த்த வழிசெய்கிறது.',
          potentialTrap: 'குத்தகைக் காலத்தின் நடுவே திடீரென வாடகை உயர்த்தப்பட்டு நீங்கள் கட்டாயமாகச் செலுத்த நேரிடும்.',
          recommendedAction: 'இந்த விதியை முற்றிலும் நீக்குங்கள். 12 மாத காலத்திற்கும் வாடகை மாறாமல் நிலைத்திருக்க வேண்டும்.'
        },
        {
          id: 'clause-deposit-forfeiture',
          exactQuote: 'Tenant acknowledges that any scratch, blemish, scuff, or normal wear and tear on flooring, countertops, or walls shall result in immediate and complete forfeiture of the entire security deposit without itemized accounting or receipt obligations by Landlord.',
          severity: 'high',
          category: 'வைப்புத்தொகை பறிமுதல் (Deposit Forfeiture)',
          riskExplanation: 'சாதாரண தேய்மானத்திற்கு வைப்புத்தொகையிலிருந்து பிடிக்க சட்டப்படி அனுமதியில்லை மற்றும் ரசீதுகள் தருவது கட்டாயம். இந்த விதி இரண்டையும் மீறுகிறது.',
          potentialTrap: 'சுவரில் சிறிய கீறல் விழுந்தாலும் எந்த ரசீதும் இன்றி உங்கள் மொத்த $4,900 வைப்புத்தொகையும் பறிமுதல் செய்யப்படும்.',
          recommendedAction: 'இந்த விதியை நீக்கிவிட்டு, 21 நாட்களுக்குள் விவரமான ரசீதுகளுடன் மீதித்தொகை திரும்பத்தரப்பட வேண்டும் என்ற சட்ட விதியை சேர்க்கவும்.'
        },
        {
          id: 'clause-hvac-maintenance',
          exactQuote: 'Tenant explicitly covenants to assume full financial responsibility for all mechanical systems, including replacement or overhaul of the furnace, HVAC compressor, water heater, and electrical wiring, irrespective of pre-existing age or natural component failure.',
          severity: 'high',
          category: 'இயந்திர பழுதுபார்ப்புச் செலவு (HVAC Capital Shift)',
          riskExplanation: 'ஏசி கம்ப்ரசர் அல்லது வாட்டர் ஹீட்டர் மாற்ற $3,000–$8,000 வரை செலவாகும். உரிமையாளரின் சொத்து மேம்பாட்டுச் செலவை வாடகைதாரர் மீது சுமத்துவது அநீதியானது.',
          potentialTrap: '15 ஆண்டுகள் பழமையான ஹீட்டர் பழுதானால், புதிய சாதனத்திற்கான $6,000 செலவை உங்கள் தலையில் கட்டுவார்கள்.',
          recommendedAction: 'இயந்திர அமைப்புகளுக்கான வாடகைதாரர் பொறுப்பை முற்றிலும் நீக்கி, உரிமையாளரே பராமரிக்க வேண்டும் என எழுதுங்கள்.'
        },
        {
          id: 'clause-entry-unrestricted',
          exactQuote: 'Landlord and Landlord\'s designated agents, contractors, and prospective buyers reserve the absolute right to enter the Premises at any hour of the day or night without prior notification to Tenant, and Landlord may retain and duplicate Tenant\'s personal keys without consent.',
          severity: 'high',
          category: 'வரம்பற்ற நுழைவு உரிமை (Unrestricted Entry)',
          riskExplanation: 'இது உங்கள் தனிப்பட்ட தனியுரிமை மற்றும் அமைதியான வாழ்வுரிமையை மீறுகிறது. குறைந்தபட்சம் 24 முதல் 48 மணிநேர முன் அறிவிப்பு அவசியம்.',
          potentialTrap: 'அறிவிப்பின்றி நள்ளிரவில் கூட ஆட்கள் உங்கள் வீட்டிற்குள் நுழைய இது அனுமதிக்கிறது.',
          recommendedAction: 'அவசரமற்ற ஆய்வுகளுக்கு வேலை நாட்களில் குறைந்தபட்சம் 24 மணிநேர முன் எழுத்துப்பூர்வ அறிவிப்பைக் கட்டாயமாக்குங்கள்.'
        },
        {
          id: 'clause-arbitration',
          exactQuote: 'All disputes arising under this agreement must be submitted to binding private arbitration located in Wilmington, Delaware, with all initial non-refundable administrative filing fees of $3,500.00 paid solely by Tenant.',
          severity: 'amber',
          category: 'கட்டாய நடுவர் மன்றம் (Binding Arbitration)',
          riskExplanation: 'பொது நீதிமன்றங்களை அணுகுவதைத் தடுத்து, $3,500 கட்டணத்தை சுமத்துகிறது. இதனால் சிறிய புகார்களுக்கு கூட நீதி பெறுவது கடினம்.',
          potentialTrap: 'வைப்புத்தொகை விவகாரத்தில் முறையிட விரும்பினால் வழக்கின் மதிப்பை விட கட்டணம் அதிகமாகும்.',
          recommendedAction: 'உள்ளூர் சிறு வழக்குகளுக்கான நீதிமன்றத்தை (Small Claims Court) அணுகும் உரிமையைத் தக்கவைத்துக் கொள்ளுங்கள்.'
        },
        {
          id: 'clause-guest-stay',
          exactQuote: 'Any visiting guest remaining in the Premises for more than forty-eight (48) cumulative hours within any thirty-day period shall be deemed an unauthorized subtenant, subjecting Tenant to immediate 24-hour summary eviction.',
          severity: 'yellow',
          category: 'கடுமையான விருந்தினர் கட்டுப்பாடு (Guest Limitation)',
          riskExplanation: '30 நாட்களில் 48 மணிநேரம் என்பது மிகக் குறைவு; ஒரு வார இறுதிக்கு நண்பர் தங்குவது கூட வெளியேற்றத்திற்கு காரணமாகலாம்.',
          potentialTrap: 'குடும்பத்தினர் வந்து தங்கினால் குத்தகை மீறல் என்று கூறி நோட்டீஸ் தர வாய்ப்புள்ளது.',
          recommendedAction: 'தொடர்ந்து 14 நாட்கள் அல்லது ஆண்டில் 21 நாட்கள் வரை விருந்தினர் தங்க அனுமதிக்கக் கோருங்கள்.'
        }
      ],
      actionChecklist: [
        {
          id: 'act-hvac',
          action: 'கையெழுத்திடுவதற்கு முன் பிரிவு 4 இயந்திரப் பழுதுபார்ப்பு விதியை நீக்கக் கோருங்கள்.',
          triggeredByClause: 'Tenant explicitly covenants to assume full financial responsibility for all mechanical systems...',
          urgency: 'urgent',
          category: 'பேச்சுவார்த்தை (Negotiate)',
          questionToAsk: 'வணக்கம், பிரிவு 4 தொடர்பாக: ஒரு வாடகைதாரராக பழைய ஏசி அல்லது ஹீட்டர் மாற்றும் மூலதனச் செலவை நான் ஏற்க முடியாது. அனைத்து கட்டமைப்பு மற்றும் இயந்திர அமைப்புகளையும் உரிமையாளரே பராமரிப்பார் என மாற்ற முடியுமா?',
          clauseIdRef: 'clause-hvac-maintenance'
        },
        {
          id: 'act-auto-renew',
          action: '120 நாள் பதிவுத் தபால் அறிவிப்பு மற்றும் 24 மாத தானியங்கி புதுப்பித்தல் விதியை நீக்குங்கள்.',
          triggeredByClause: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
          urgency: 'urgent',
          category: 'பேச்சுவார்த்தை (Negotiate)',
          questionToAsk: 'பிரிவு 1-ஐ திருத்தி, 12 மாத காலத்திற்குப் பிறகு 60 நாள் மின்னஞ்சல் அறிவிப்புடன் மாதம் தோறும் தொடரும் வழக்கமான குத்தகையாக மாற்றலாமா?',
          clauseIdRef: 'clause-auto-renewal'
        },
        {
          id: 'act-deposit',
          action: 'வீட்டில் குடியேறும் முதல் நாளிலேயே அனைத்து சுவர்கள், தரை மற்றும் சாதனங்களை புகைப்படம் மற்றும் வீடியோ பதிவு செய்யுங்கள்.',
          triggeredByClause: 'Tenant acknowledges that any scratch, blemish, scuff, or normal wear and tear... immediate and complete forfeiture...',
          urgency: 'urgent',
          category: 'ஆவணம் (Record)',
          questionToAsk: 'வைப்புத்தொகை பிடித்தத்திற்கு விவரமான ரசீதுகள் கட்டாயம் என்றும், சாதாரண தேய்மானத்திற்கு விலக்கு உண்டு என்றும் எழுத்துப்பூர்வமாக உறுதி செய்ய முடியுமா?',
          clauseIdRef: 'clause-deposit-forfeiture'
        },
        {
          id: 'act-notice-entry',
          action: 'உரிமையாளர் அல்லது தொழிலாளர்கள் வருவதற்கு முன் 24 மணி நேர எழுத்துப்பூர்வ அறிவிப்பை கட்டாயமாக்குங்கள்.',
          triggeredByClause: '...reserve the absolute right to enter the Premises at any hour of the day or night without prior notification...',
          urgency: 'important',
          category: 'பேச்சுவார்த்தை (Negotiate)',
          questionToAsk: 'பிரிவு 5-ல், அவசரமற்ற சோதனைகளுக்கு வேலை நாட்களில் 24 மணிநேர முன் அறிவிப்பு கட்டாயம் என்ற வழக்கமான விதியை சேர்க்கலாமா?',
          clauseIdRef: 'clause-entry-unrestricted'
        },
        {
          id: 'act-calendar',
          action: 'குத்தகை முடிவதற்கு 150 நாட்கள் மற்றும் 130 நாட்களுக்கு முன் போன் மற்றும் காலெண்டர் நினைவூட்டல் வையுங்கள்.',
          triggeredByClause: '...written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
          urgency: 'important',
          category: 'காலெண்டர் (Calendar)',
          questionToAsk: 'குத்தகை புதுப்பித்தல் அல்லது வெளியேறும் அறிவிப்பை அனுப்ப அதிகாரப்பூர்வ அஞ்சல் முகவரி மற்றும் மின்னஞ்சல் எது?',
          clauseIdRef: 'clause-auto-renewal'
        }
      ],
      glossary: [
        { term: 'Per Diem', plainMeaning: 'செலுத்தும் வரை நாள்தோறும் கணக்கிடப்படும் தினசரி அபராதம் அல்லது கட்டணம்.' },
        { term: 'Summary Eviction', plainMeaning: 'குறைந்தபட்ச அறிவிப்புடன் வாடகைதாரரை உடனடியாக வெளியேற்றும் துரித சட்ட நடவடிக்கை.' },
        { term: 'Arbitration (நடுவர் மன்றம்)', plainMeaning: 'நீதிமன்றத்திற்கு வெளியே தனியார் நடுவர் முன்னிலையில் வழக்கை முடிப்பது; இதன் தீர்ப்பு கட்டாயமானது.' },
        { term: 'Covenants (உடன்படிக்கைகள்)', plainMeaning: 'நீங்கள் நிறைவேற்ற ஒப்புக்கொள்ளும் முறையான சட்ட உறுதிமொழிகள் அல்லது கடமைகள்.' }
      ]
    },
    'medical-consent': {
      documentType: 'மருத்துவ ஒப்புதல் படிவம் (Medical Consent & Waiver)',
      riskVerdict: 'அதிகப்படியான மருத்துவக் கட்டணங்கள் மற்றும் பொறுப்புத் துறப்பு அபாயங்கள் உள்ளன',
      plainLanguageSummary: `இந்த மருத்துவ ஒப்புதல் படிவம் கடுமையான நிதி மற்றும் சட்ட அபாயங்களைக் கொண்டுள்ளது. நெட்வொர்க்கில் இல்லாத மயக்க மருந்து நிபுணர்கள் அல்லது மருத்துவர்களின் முழு கட்டணங்களுக்கும் உங்களை தனிப்பட்ட முறையில் பொறுப்பாக்குகிறது. மேலும், மருத்துவ அலட்சியத்திற்கான பொறுப்பிலிருந்து மருத்துவமனையை விடுவிக்கவும், உங்கள் அறுவைசிகிச்சை வீடியோக்களை பொது விளம்பரங்களில் பயன்படுத்தவும் இது அனுமதி கோருகிறது.`,
      keyTakeaways: [
        'நெட்வொர்க்கில் இல்லாத மருத்துவர்களின் 100% கட்டணங்களுக்கும் உங்களை பொறுப்பாக்குகிறது.',
        'மருத்துவ அலட்சியம் மற்றும் தவறுகளுக்கான பொறுப்பில் இருந்து மருத்துவமனைக்கு முழு விலக்கு.',
        'உடலில் இருந்து அகற்றப்படும் திசுக்கள் மற்றும் டிஎன்ஏ மீதான வணிக உரிமைகளை மாற்றுதல்.',
        'அறுவை சிகிச்சை வீடியோக்களை பொது விளம்பரங்களில் முகத்தை மறைக்காமல் வெளியிட அனுமதித்தல்.'
      ],
      deadlines: [
        {
          id: 'dl-insurance-preauth',
          title: 'இன்-நெட்வொர்க் மருத்துவர் சரிபார்ப்பு அவகாசம்',
          timeframe: 'மருத்துவமனையில் அனுமதிக்கப்படும் நாளுக்கு முன்',
          exactTrigger: 'Patient acknowledges that independent contracting physicians... do not participate in Patient\'s primary insurance network.',
          consequenceIfMissed: 'நெட்வொர்க்கில் இல்லாத மருத்துவர்களின் முழு கட்டணங்களுக்கும் நீங்களே பொறுப்பாவீர்கள்.',
          suggestedCalendarDays: 3
        }
      ],
      riskyClauses: [
        {
          id: 'med-surprise-billing',
          exactQuote: 'Patient explicitly agrees to accept complete personal financial responsibility for all balance-billed charges at 100% of the Hospital\'s master gross charge list, waiving any statutory surprise medical billing caps.',
          severity: 'high',
          category: 'எதிர்பாராத மருத்துவக் கட்டணம் (Surprise Billing)',
          riskExplanation: 'சட்டப்பூர்வ கட்டண உச்சவரம்பைத் துறப்பது, காப்பீட்டில் வராத நிபுணர்களின் ஆயிரக்கணக்கான டாலர் கட்டணங்களுக்கு உங்களை ஆளாக்குகிறது.',
          potentialTrap: 'மயக்க மருந்து நிபுணர் $8,000 கட்டணத்தை நேரடியாக உங்களிடம் கோரலாம், இதை காப்பீடு ஏற்காது.',
          recommendedAction: 'இந்த வரியை அடித்துவிட்டு: "நோ சர்ப்ரைசஸ் சட்டத்தின்படி இன்-நெட்வொர்க் கட்டணங்களுக்கு மட்டுமே ஒப்புக்கொள்கிறேன்" என்று எழுதவும்.'
        },
        {
          id: 'med-negligence-waiver',
          exactQuote: 'Patient forever releases and discharges Hospital, its executives, attending physicians, and vendor representatives from any and all liability for personal injury, hospital-acquired bacterial infections, procedural errors, equipment malfunction, or nerve damage, whether caused by ordinary negligence or systemic facility oversight.',
          severity: 'high',
          category: 'அலட்சியத்திற்கான பொறுப்புத் துறப்பு (Malpractice Waiver)',
          riskExplanation: 'மருத்துவ அலட்சியம் அல்லது கருவிப் பழுதுக்கு மருத்துவமனை பொறுப்பல்ல என்று கூறுவது சட்டவிரோதமானது மற்றும் ஆபத்தானது.',
          potentialTrap: 'சிகிச்சையின் போது தவறு நிகழ்ந்தாலும் இழப்பீடு கோர முடியாதபடி இந்த விதி தடுக்கக்கூடும்.',
          recommendedAction: 'கையெழுத்திடுவதற்கு முன் பிரிவு 3 ஐ ஒரு கோடு போட்டு அடித்து அருகே கையெழுத்திடுங்கள்.'
        },
        {
          id: 'med-media-release',
          exactQuote: 'Furthermore, Patient consents to unredacted video and photographic recording of the procedure for worldwide promotional and educational distribution across public digital media channels without compensation or anonymity.',
          severity: 'amber',
          category: 'பொது வீடியோ பதிவு ஒப்புதல் (Media Release)',
          riskExplanation: 'உங்கள் முகத்தை மறைக்காமல் அறுவை சிகிச்சை வீடியோக்களை சமூக ஊடகங்களில் வெளியிட மருத்துவமனைக்கு அனுமதி அளிக்கிறது.',
          potentialTrap: 'உங்கள் அறுவை சிகிச்சை காட்சிகள் வணிக விளம்பரங்களில் தோன்றக்கூடும்.',
          recommendedAction: 'பிரிவு 4 ஐ முற்றிலும் அடித்து "எந்த வீடியோ அல்லது புகைப்படத்திற்கும் ஒப்புதல் இல்லை" என்று எழுதவும்.'
        },
        {
          id: 'med-unforeseen-expansion',
          exactQuote: 'I acknowledge that during the operation, unforeseen conditions may necessitate additional or altered procedures, and I grant unconditional consent to any amputation, excision, or surgical variation deemed convenient by the attending staff.',
          severity: 'yellow',
          category: 'அறுவை சிகிச்சை நீட்டிப்பு (Unforeseen Procedure)',
          riskExplanation: 'அவசரத் தேவைக்கு பதிலாக ஊழியர்களின் "வசதிக்கு" ஏற்ப கூடுதல் அறுவை சிகிச்சை செய்ய அனுமதி கோருகிறது.',
          potentialTrap: 'முன்னரே பேசப்படாத கூடுதல் உறுப்பு நீக்கங்களை மருத்துவர் தன்னிச்சையாகச் செய்யக்கூடும்.',
          recommendedAction: '"வசதிக்கு ஏற்ப" என்பதை நீக்கி "உயிர் காக்கும் அவசர நிலைக்கு மட்டும்" என மாற்றவும்.'
        }
      ],
      actionChecklist: [
        {
          id: 'act-cross-billing',
          action: 'பிரிவு 2-ல் எதிர்பாராத மருத்துவக் கட்டண உச்சவரம்புத் துறப்பை நீக்குங்கள்.',
          triggeredByClause: 'Patient explicitly agrees to accept complete personal financial responsibility...',
          urgency: 'urgent',
          category: 'தெளிவுபடுத்து (Clarify)',
          questionToAsk: 'என் சிகிச்சையில் பங்கேற்கும் அனைத்து மயக்க மருந்து மற்றும் அறுவை சிகிச்சை மருத்துவர்களும் என் காப்பீட்டு நெட்வொர்க்கில் உள்ளவர்களா என எழுத்துப்பூர்வமாக உறுதிப்படுத்த முடியுமா?',
          clauseIdRef: 'med-surprise-billing'
        },
        {
          id: 'act-strike-negligence',
          action: 'பிரிவு 3-ஐ அடியுங்கள், இது மருத்துவமனையை அலட்சியப் பொறுப்பிலிருந்து விடுவிக்கிறது.',
          triggeredByClause: 'Patient forever releases and discharges Hospital... from any and all liability...',
          urgency: 'urgent',
          category: 'பேச்சுவார்த்தை (Negotiate)',
          questionToAsk: 'அலட்சியப் பொறுப்புத் துறப்பு தொடர்பான பிரிவு 3-ஐ நான் நீக்குகிறேன்; சாதாரண நோயாளி ஒப்புதல் மருத்துவ அலட்சியத்திற்கான பொறுப்பைத் துறக்காது. இதில் கையொப்பமிட முடியுமா?',
          clauseIdRef: 'med-negligence-waiver'
        },
        {
          id: 'act-media-opt-out',
          action: 'விளம்பரப் புகைப்படம் மற்றும் பொது வீடியோ பதிவிலிருந்து விலகுங்கள்.',
          triggeredByClause: '...unredacted video and photographic recording of the procedure for worldwide promotional...',
          urgency: 'important',
          category: 'தனியுரிமை (Privacy)',
          questionToAsk: 'பொது ஊடகங்கள் அல்லது விளம்பரப் பதிவுகளுக்கு நான் ஒப்புதல் அளிக்கவில்லை என்பதை பதிவேட்டில் குறித்துக் கொண்டீர்களா?',
          clauseIdRef: 'med-media-release'
        }
      ],
      glossary: [
        { term: 'Balance Billing', plainMeaning: 'காப்பீடு வழங்கிய தொகைக்கும் மருத்துவர் கேட்ட முழு கட்டணத்திற்கும் இடையேயான பாக்கியை நோயாளி செலுத்துதல்.' },
        { term: 'Informed Consent', plainMeaning: 'சிகிச்சையின் அனைத்து நன்மைகள் மற்றும் ஆபத்துக்களைப் புரிந்து கொண்ட பிறகு தரப்படும் ஒப்புதல்.' },
        { term: 'Waiver of Liability', plainMeaning: 'பாதிப்பு ஏற்பட்டாலும் இழப்பீடு கோர மாட்டேன் என அளிக்கும் சட்டப்பூர்வ வாக்குறுதி.' }
      ]
    },
    'government-notice': {
      documentType: 'நகராட்சி நிர்வாக நோட்டீஸ் (Municipal Administrative Citation)',
      riskVerdict: 'காலக்கெடு உள்ள நோட்டீஸ் — நாளொன்றுக்கு $500 அபராதம் மற்றும் சொத்து ஏல அபாயம்',
      plainLanguageSummary: `இது ஒரு அவசர நகராட்சி விதிமீறல் நோட்டீஸ் ஆகும். குறிப்பிடப்பட்ட குறைபாடுகளைச் சரிசெய்ய உங்களுக்கு 7 வேலை நாட்கள் மட்டுமே அவகாசம் உள்ளது, தவறினால் நாளொன்றுக்கு $500 அபராதம் கூட்டு வட்டி போல அதிகரிக்கும். மேல்முறையீடு செய்ய வேண்டுமானால் 10 நாட்களுக்குள் $450 வங்கி வரைவோலையுடன் (Demand Draft) நேரில் மட்டுமே செல்ல வேண்டும்; தபால் அல்லது மின்னஞ்சல் முறையீடுகள் நிராகரிக்கப்படும். 30 நாட்களில் சொத்து மீது வரிப் பற்று வைக்கப்பட்டு ஏலம் விடப்படலாம்.`,
      keyTakeaways: [
        'குறைபாடுகளைச் சரிசெய்ய 7 வேலை நாட்கள் மட்டுமே அவகாசம், தவறினால் தினமும் $500 அபராதம்.',
        '10 நாட்களுக்குள் $450 கட்டணத்துடன் நேரில் மட்டுமே மேல்முறையீடு செய்ய முடியும்.',
        'தபால் அல்லது மின்னஞ்சல் மூலம் அனுப்பப்படும் மேல்முறையீடுகள் நிராகரிக்கப்படும்.',
        '30 நாட்களில் சொத்தின் மீது வரிப் பற்று வைக்கப்பட்டு நீதிமன்ற விசாரணையின்றி ஏலம் விடப்படலாம்.'
      ],
      deadlines: [
        {
          id: 'dl-cure-period',
          title: 'குறைபாட்டை சரிசெய்யும் காலக்கெடு (Cure Period)',
          timeframe: 'நோட்டீஸ் கிடைத்ததிலிருந்து 7 வேலை நாட்கள்',
          exactTrigger: 'Violations must be fully abated and certified... within seven (7) business days.',
          consequenceIfMissed: 'நாளொன்றுக்கு $500 அபராதம் வாரந்தோறும் கூட்டு வட்டியாகக் கணக்கிடப்படும்.',
          suggestedCalendarDays: 7
        },
        {
          id: 'dl-appeal-window',
          title: 'நேரில் மேல்முறையீடு செய்யும் அவகாசம்',
          timeframe: '10 நாள்காட்டி நாட்கள்',
          exactTrigger: 'Formal appeal must be submitted in person... within ten (10) calendar days.',
          consequenceIfMissed: 'மேல்முறையீட்டு உரிமை பறிபோய் அபராதம் உறுதிப்படுத்தப்படும்.',
          suggestedCalendarDays: 10
        }
      ],
      riskyClauses: [
        {
          id: 'gov-daily-penalty',
          exactQuote: 'Failure to achieve compliance within seven (7) business days shall result in an administrative civil penalty of $500.00 per calendar day, compounding weekly, without requirement of additional judicial process.',
          severity: 'high',
          category: 'தினசரி கூட்டு அபராதம் (Compounding Penalties)',
          riskExplanation: 'நாளொன்றுக்கு $500 அபராதம் வாரம் தோறும் கூடுகிறது, இது ஒரு மாதத்தில் $20,000 க்கும் அதிகமாகும்.',
          potentialTrap: 'சிறிய தாமதம் கூட மிகப்பெரிய நிதி இழப்பை ஏற்படுத்தும்.',
          recommendedAction: 'அபராதத்தைத் தவிர்க்க உடனடியாக 30 நாள் அவகாச நீட்டிப்பைக் கோருங்கள்.'
        },
        {
          id: 'gov-in-person-appeal',
          exactQuote: 'Appeals submitted via standard postal mail, electronic mail, or telephone shall be deemed null, void, and untimely.',
          severity: 'high',
          category: 'கடுமையான மேல்முறையீட்டு விதி (Strict Appeal Rules)',
          riskExplanation: 'தபால் அல்லது மின்னஞ்சல் முறையீடுகள் நிராகரிக்கப்படும்; நேரில் மட்டுமே செல்ல வேண்டும்.',
          potentialTrap: 'மின்னஞ்சல் அனுப்பிவிட்டோம் என நினைத்திருக்க, காலக்கெடு முடிந்து அபராதம் ஏறிக்கொண்டிருக்கும்.',
          recommendedAction: 'உடனடியாக சிட்டி ஹாலுக்கு நேரில் சென்று ஒப்புகைச் சீட்டுடன் மனு அளியுங்கள்.'
        }
      ],
      actionChecklist: [
        {
          id: 'act-file-extension',
          action: 'அபராதத்தை நிறுத்தி வைக்க உடனே 30 நாள் அவகாச மனு அளியுங்கள்.',
          triggeredByClause: 'Failure to achieve compliance within seven (7) business days...',
          urgency: 'urgent',
          category: 'மேல்முறையீடு (Appeal)',
          questionToAsk: 'குறைபாடுகளைச் சரிசெய்யும் பணி நடப்பதால், அபராதம் உயர்வதைத் தற்காலிகமாக நிறுத்த 30 நாள் அவகாசம் தர முடியுமா?',
          clauseIdRef: 'gov-daily-penalty'
        }
      ],
      glossary: [
        { term: 'Tax Lien', plainMeaning: 'செலுத்தப்படாத அபராதத்திற்காக சொத்து மீது வைக்கப்படும் சட்டப்பூர்வ பற்றுரிமை.' },
        { term: 'Abatement', plainMeaning: 'விதிமீறலை நகராட்சி விதிகளின்படி முழுமையாக சரிசெய்தல்.' },
        { term: 'Summary Process', plainMeaning: 'நீதிமன்ற விசாரணை இல்லாமல் நிர்வாக ரீதியாக எடுக்கப்படும் விரைவு நடவடிக்கை.' }
      ]
    }
  }
};
