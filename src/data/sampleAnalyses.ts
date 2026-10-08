import { DocumentAnalysis } from '../types';

export const SAMPLE_ANALYSES: Record<string, DocumentAnalysis> = {
  'rental-agreement': {
    documentType: 'Residential Lease Agreement',
    overallRiskLevel: 'high',
    riskScore: 8,
    riskVerdict: 'Predatory Landlord Tilt — Do Not Sign Without Amending Section 1, 3 & 4',
    plainLanguageSummary: `This lease agreement is heavily tilted in favor of the landlord with multiple hidden financial traps. It locks you into a mandatory two-year automatic renewal at 25% higher rent if you miss a 120-day certified mail notice deadline. It also forces you to pay for major capital equipment like HVAC compressor replacements, permits unrestricted landlord entry at any hour without notice, and claims immediate forfeiture of your $4,900 deposit for normal scuffs.`,
    keyTakeaways: [
      'Automatic renewal traps you for 24 months at +25% rent unless certified mail is sent 120 days prior.',
      'Shifts thousands of dollars in mechanical/HVAC capital replacements onto the tenant.',
      'Allows landlord entry at any hour of the day or night without any prior notice.',
      'Immediate forfeiture of full $4,900 security deposit for normal wear and tear without receipts.',
      'Mandatory private arbitration in Delaware with $3,500 non-refundable filing fees paid by tenant.'
    ],
    deadlines: [
      {
        id: 'dl-renew',
        title: 'Non-Renewal Certified Mail Notice',
        timeframe: '120 days before lease expiration (August 2, 2027)',
        exactTrigger: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
        consequenceIfMissed: 'Automatic 24-month renewal at 25% increased rent ($3,062.50/mo)',
        suggestedCalendarDays: 120
      },
      {
        id: 'dl-rent-hike',
        title: 'Unilateral Rent Increase Notice Window',
        timeframe: '14 days via email',
        exactTrigger: '...upon fourteen (14) days informal email notice to offset rising building operational costs.',
        consequenceIfMissed: 'Rent increase takes effect immediately without lease renegotiation.',
        suggestedCalendarDays: 14
      },
      {
        id: 'dl-guest',
        title: 'Guest Stay Limit Before Eviction Threat',
        timeframe: '48 cumulative hours in any 30-day period',
        exactTrigger: 'Any visiting guest remaining in the Premises for more than forty-eight (48) cumulative hours... summary eviction.',
        consequenceIfMissed: 'Guest treated as unauthorized subtenant, triggering 24-hour summary eviction notice.',
        suggestedCalendarDays: 2
      }
    ],
    riskyClauses: [
      {
        id: 'clause-auto-renewal',
        exactQuote: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior to the expiration date, this Lease shall automatically renew for a subsequent fixed term of twenty-four (24) months at an increased monthly rent of twenty-five percent (25%).',
        severity: 'high',
        category: 'Automatic Renewal Trap',
        riskExplanation: 'A 120-day notice window is twice the standard length, and missing it binds you to an entire two-year lease extension with a massive 25% rent surge.',
        potentialTrap: 'If you notify the landlord 90 days before lease end, you are still legally trapped for 2 more years and over $73,000 in mandatory rent.',
        recommendedAction: 'Negotiate this clause to convert to a standard month-to-month lease after 12 months with standard 30 or 60 days email notice.'
      },
      {
        id: 'clause-rent-increase',
        exactQuote: 'Landlord reserves the unilateral right to adjust monthly base rent at any time upon fourteen (14) days informal email notice to offset rising building operational costs.',
        severity: 'high',
        category: 'Unilateral Rent Increase',
        riskExplanation: 'Fixed-term leases are meant to guarantee rent stability. This clause allows the landlord to hike your rent at will with only 2 weeks notice.',
        potentialTrap: 'Your rent could increase mid-lease with no recourse except breaking the lease or paying the higher amount.',
        recommendedAction: 'Strike out this clause entirely. A fixed-term lease should maintain a guaranteed flat rental rate for the entire 12-month period.'
      },
      {
        id: 'clause-deposit-forfeiture',
        exactQuote: 'Tenant acknowledges that any scratch, blemish, scuff, or normal wear and tear on flooring, countertops, or walls shall result in immediate and complete forfeiture of the entire security deposit without itemized accounting or receipt obligations by Landlord.',
        severity: 'high',
        category: 'Security Deposit Forfeiture',
        riskExplanation: 'In almost every jurisdiction, landlords are strictly barred from deducting for normal wear and tear, and must provide an itemized list of deductions.',
        potentialTrap: 'You lose your entire $4,900 deposit for minor scuffs on the floor without the landlord having to show any proof of repair costs.',
        recommendedAction: 'Strike this clause and replace with standard statutory language requiring return of deposit within 21 days with itemized receipts.'
      },
      {
        id: 'clause-hvac-maintenance',
        exactQuote: 'Tenant explicitly covenants to assume full financial responsibility for all mechanical systems, including replacement or overhaul of the furnace, HVAC compressor, water heater, and electrical wiring, irrespective of pre-existing age or natural component failure.',
        severity: 'high',
        category: 'Capital Expense Shift',
        riskExplanation: 'Replacing an HVAC compressor or water heater costs $3,000–$8,000+. Shifting owner capital improvements to a renter is unreasonable and predatory.',
        potentialTrap: 'If a 15-year-old furnace fails in winter, the landlord can bill you $6,000 to purchase a brand-new heating system for their property.',
        recommendedAction: 'Completely eliminate tenant liability for mechanical and structural systems; specify landlord responsibility for habitability repairs.'
      },
      {
        id: 'clause-entry-unrestricted',
        exactQuote: 'Landlord and Landlord\'s designated agents, contractors, and prospective buyers reserve the absolute right to enter the Premises at any hour of the day or night without prior notification to Tenant, and Landlord may retain and duplicate Tenant\'s personal keys without consent.',
        severity: 'high',
        category: 'Unrestricted Entry',
        riskExplanation: 'Violates your basic right to quiet enjoyment and privacy. Standard leases require at least 24 to 48 hours advance written notice.',
        potentialTrap: 'Strangers, contractors, or prospective buyers could walk into your home while you are sleeping without any warning.',
        recommendedAction: 'Require minimum 24-hour advance written notice for non-emergency inspections during normal business hours only.'
      },
      {
        id: 'clause-arbitration',
        exactQuote: 'All disputes arising under this agreement must be submitted to binding private arbitration located in Wilmington, Delaware, with all initial non-refundable administrative filing fees of $3,500.00 paid solely by Tenant.',
        severity: 'amber',
        category: 'Binding Arbitration & Forum',
        riskExplanation: 'Forces out-of-state arbitration and imposes an upfront $3,500 fee, effectively blocking you from seeking justice in small claims court.',
        potentialTrap: 'If the landlord steals your deposit or turns off heat, taking legal action costs more in arbitration fees than the dispute itself.',
        recommendedAction: 'Reserve rights to resolve disputes in local municipal small claims court.'
      },
      {
        id: 'clause-guest-stay',
        exactQuote: 'Any visiting guest remaining in the Premises for more than forty-eight (48) cumulative hours within any thirty-day period shall be deemed an unauthorized subtenant, subjecting Tenant to immediate 24-hour summary eviction.',
        severity: 'yellow',
        category: 'Strict Guest Limitation',
        riskExplanation: 'A 48-hour cumulative limit over 30 days is extremely strict; a friend staying for a weekend could trigger an unauthorized occupant warning.',
        potentialTrap: 'Landlord claims lease violation if a family member visits for a long weekend.',
        recommendedAction: 'Request standard guest limit of 14 consecutive days or 21 cumulative days per calendar year.'
      }
    ],
    actionChecklist: [
      {
        id: 'act-hvac',
        action: 'Demand removal of Section 4 mechanical replacement clause before signing.',
        triggeredByClause: 'Tenant explicitly covenants to assume full financial responsibility for all mechanical systems, including replacement or overhaul of the furnace, HVAC compressor...',
        urgency: 'urgent',
        category: 'Negotiate',
        questionToAsk: 'Hi Landlord, regarding Section 4: As a tenant, I cannot assume capital replacement costs for pre-existing furnaces or HVAC compressors. Can we adjust this to state the landlord maintains all structural and mechanical systems?',
        clauseIdRef: 'clause-hvac-maintenance'
      },
      {
        id: 'act-auto-renew',
        action: 'Strike out the 120-day certified mail notice and 24-month automatic renewal penalty.',
        triggeredByClause: 'Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
        urgency: 'urgent',
        category: 'Negotiate',
        questionToAsk: 'Could we amend Section 1 so the lease converts to standard month-to-month after the 12-month term, with 60 days standard written email notice instead of 120 days certified mail?',
        clauseIdRef: 'clause-auto-renewal'
      },
      {
        id: 'act-deposit',
        action: 'Photograph and video-record every square inch of walls, floors, and appliances on move-in day.',
        triggeredByClause: 'Tenant acknowledges that any scratch, blemish, scuff, or normal wear and tear... shall result in immediate and complete forfeiture...',
        urgency: 'urgent',
        category: 'Photograph',
        questionToAsk: 'Could we confirm in writing that deposit deductions will follow statutory rules requiring an itemized invoice, and normal wear and tear is exempt?',
        clauseIdRef: 'clause-deposit-forfeiture'
      },
      {
        id: 'act-notice-entry',
        action: 'Require 24 hours written notice before any landlord or contractor entry.',
        triggeredByClause: '...reserve the absolute right to enter the Premises at any hour of the day or night without prior notification...',
        urgency: 'important',
        category: 'Negotiate',
        questionToAsk: 'In Section 5, could we include standard 24-hour advance written notice before non-emergency landlord or contractor inspections during weekday business hours?',
        clauseIdRef: 'clause-entry-unrestricted'
      },
      {
        id: 'act-calendar',
        action: 'Set phone and calendar alerts 150 days and 130 days ahead of lease end.',
        triggeredByClause: '...written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior...',
        urgency: 'important',
        category: 'Calendar',
        questionToAsk: 'What is the designated official mailing and email address to send lease renewal or departure notifications to?',
        clauseIdRef: 'clause-auto-renewal'
      }
    ],
    glossary: [
      { term: 'Per Diem', plainMeaning: 'A daily charge or penalty calculated on an everyday ongoing basis until paid.' },
      { term: 'Summary Eviction', plainMeaning: 'An expedited legal proceeding to remove a tenant from real property with minimal notice.' },
      { term: 'Arbitration', plainMeaning: 'Resolving a dispute outside of public court before a private hired arbitrator whose ruling is binding.' },
      { term: 'Covenants', plainMeaning: 'Formal legal promises or binding obligations you pledge to fulfill.' }
    ],
    analyzedAt: new Date().toISOString(),
    characterCount: 2200,
    matchedClausesCount: 7
  },
  'medical-consent': {
    documentType: 'Medical Consent & Financial Waiver',
    overallRiskLevel: 'high',
    riskScore: 7,
    riskVerdict: 'Surprise Out-of-Network Billing & Liability Waivers Present',
    plainLanguageSummary: `This medical consent form contains dangerous financial and legal waivers. It signs away statutory protections against out-of-network balance billing, potentially making you liable for full master chargemaster rates from independent anesthesiologists or radiologists. It also attempts to release the facility from negligence claims and claims commercial research rights over your genetic tissue and surgical video recordings.`,
    keyTakeaways: [
      'Waives surprise billing protections, making you liable for 100% of out-of-network physician charges.',
      'Attempts to shield the facility and doctors from all liability for malpractice and infections.',
      'Transfers all intellectual and commercial rights to your excised bodily tissue and DNA.',
      'Grants unconditional rights to publish unredacted surgical video on public promotional channels.',
      'Forces binding arbitration for all disputes over $1,000.'
    ],
    deadlines: [
      {
        id: 'dl-insurance-preauth',
        title: 'In-Network Provider Verification',
        timeframe: 'Before day of outpatient admission',
        exactTrigger: 'Patient acknowledges that independent contracting physicians... do not participate in Patient\'s primary insurance network.',
        consequenceIfMissed: 'Liable for 100% balance-billed charges from out-of-network doctors.',
        suggestedCalendarDays: 3
      }
    ],
    riskyClauses: [
      {
        id: 'med-surprise-billing',
        exactQuote: 'Patient explicitly agrees to accept complete personal financial responsibility for all balance-billed charges at 100% of the Hospital\'s master gross charge list, waiving any statutory surprise medical billing caps.',
        severity: 'high',
        category: 'Surprise Out-of-Network Billing',
        riskExplanation: 'Waiving surprise billing protections exposes you to thousands of dollars in uncovered fees from non-network specialists.',
        potentialTrap: 'An out-of-network anesthesiologist could bill you $8,000 directly, which your health insurance will refuse to cover.',
        recommendedAction: 'Cross out this sentence and write: "Patient agrees only to in-network rates under the No Surprises Act."'
      },
      {
        id: 'med-negligence-waiver',
        exactQuote: 'Patient forever releases and discharges Hospital, its executives, attending physicians, and vendor representatives from any and all liability for personal injury, hospital-acquired bacterial infections, procedural errors, equipment malfunction, or nerve damage, whether caused by ordinary negligence or systemic facility oversight.',
        severity: 'high',
        category: 'Malpractice Liability Waiver',
        riskExplanation: 'Attempting to waive physician and facility liability for medical negligence or equipment breakdown is legally dubious and dangerous.',
        potentialTrap: 'If surgical instruments malfunction or cause preventable injury, this waiver will be used to deny your claim.',
        recommendedAction: 'Draw a single line through Section 3 and initial next to it before signing.'
      },
      {
        id: 'med-media-release',
        exactQuote: 'Furthermore, Patient consents to unredacted video and photographic recording of the procedure for worldwide promotional and educational distribution across public digital media channels without compensation or anonymity.',
        severity: 'amber',
        category: 'Public Video Recording Waiver',
        riskExplanation: 'Allows the hospital to post recognizable videos of your medical operation on social media without blurring your face or body.',
        potentialTrap: 'Surgical footage of you could appear on commercial medical advertising or social channels.',
        recommendedAction: 'Explicitly strike out Section 4 and write "No photographic or video consent granted."'
      },
      {
        id: 'med-unforeseen-expansion',
        exactQuote: 'I acknowledge that during the operation, unforeseen conditions may necessitate additional or altered procedures, and I grant unconditional consent to any amputation, excision, or surgical variation deemed convenient by the attending staff.',
        severity: 'yellow',
        category: 'Unforeseen Procedure Expansion',
        riskExplanation: 'Broad consent for variations deemed "convenient" rather than medically essential creates open-ended surgical discretion.',
        potentialTrap: 'Surgeon performs secondary non-emergency excision without prior discussion.',
        recommendedAction: 'Change "convenient" to "immediately life-threatening or medically necessary in emergency".'
      }
    ],
    actionChecklist: [
      {
        id: 'act-cross-billing',
        action: 'Strike out the waiver of surprise medical billing caps in Section 2.',
        triggeredByClause: 'Patient explicitly agrees to accept complete personal financial responsibility for all balance-billed charges at 100%...',
        urgency: 'urgent',
        category: 'Clarify',
        questionToAsk: 'Could you please confirm in writing that all attending anesthesiologists and surgical staff for my procedure are participating in-network with my insurance plan?',
        clauseIdRef: 'med-surprise-billing'
      },
      {
        id: 'act-strike-negligence',
        action: 'Cross out Section 3 releasing hospital from malpractice and infection liability.',
        triggeredByClause: 'Patient forever releases and discharges Hospital... from any and all liability for personal injury...',
        urgency: 'urgent',
        category: 'Negotiate',
        questionToAsk: 'I am striking Section 3 regarding negligence release; standard patient consent does not waive provider accountability for malpractice. Can you initial this amendment?',
        clauseIdRef: 'med-negligence-waiver'
      },
      {
        id: 'act-media-opt-out',
        action: 'Opt out of marketing photography and public video distribution.',
        triggeredByClause: '...unredacted video and photographic recording of the procedure for worldwide promotional and educational distribution...',
        urgency: 'important',
        category: 'Privacy',
        questionToAsk: 'I do not consent to promotional or social media video recording. Can you mark my patient chart as opted-out of all media capture?',
        clauseIdRef: 'med-media-release'
      }
    ],
    glossary: [
      { term: 'Balance Billing', plainMeaning: 'When an out-of-network doctor bills you for the full difference between their price and what insurance pays.' },
      { term: 'Gross Charge List', plainMeaning: 'The hospital’s inflated official master price sheet before insurance discounts are deducted.' },
      { term: 'Informed Consent', plainMeaning: 'Agreement given only after full explanation of procedural risks, alternatives, and benefits.' }
    ],
    analyzedAt: new Date().toISOString(),
    characterCount: 1800,
    matchedClausesCount: 4
  },
  'government-notice': {
    documentType: 'Municipal Administrative Citation',
    overallRiskLevel: 'high',
    riskScore: 9,
    riskVerdict: 'Time-Critical Legal Notice — Imminent Compounding Daily Fines & Lien Threat',
    plainLanguageSummary: `This is an urgent municipal code enforcement citation with severe compounding financial penalties. You have only 7 business days to remedy cited alterations before automatic $500/day fines begin compounding. Appeals must be filed in person at City Hall within 10 calendar days with a $450 certified draft; written or email appeals are disqualified. After 30 days of non-payment, the city may file a property tax lien and auction the parcel.`,
    keyTakeaways: [
      'Strict 7-business-day window to remedy cited defects or face $500/day compounding penalties.',
      'Appeals must be submitted in person with a non-refundable $450 bank draft within 10 calendar days.',
      'Written appeals sent by mail or email will be summarily ignored.',
      'Senior municipal tax lien recorded after 30 days, allowing public auction.'
    ],
    deadlines: [
      {
        id: 'dl-remedy',
        title: 'Defect Remediation Window',
        timeframe: '7 business days from postmark date',
        exactTrigger: 'You are hereby ordered to abate all cited conditions within seven (7) business days of the postmarked date of this notice.',
        consequenceIfMissed: 'Immediate automatic assessment of $500.00 per calendar day compounding weekly.',
        suggestedCalendarDays: 7
      },
      {
        id: 'dl-appeal',
        title: 'Administrative Appeal Filing Deadline',
        timeframe: '10 calendar days from notice issuance',
        exactTrigger: 'Any appeal of this determination must be filed in person at City Hall Suite 400 within exactly ten (10) calendar days...',
        consequenceIfMissed: 'Permanent forfeiture of right to administrative hearing; citation becomes final order.',
        suggestedCalendarDays: 10
      },
      {
        id: 'dl-lien',
        title: 'Statutory Lien Recording & Foreclosure',
        timeframe: '30 consecutive days of unsatisfied penalties',
        exactTrigger: 'In the event accrued penalties and inspection re-examination fees remain unsatisfied for thirty (30) consecutive days...',
        consequenceIfMissed: 'Recording of senior property tax lien and possible public auction without judicial foreclosure.',
        suggestedCalendarDays: 30
      }
    ],
    riskyClauses: [
      {
        id: 'gov-daily-penalty',
        exactQuote: 'Failure to bring the parcel into verified compliance shall result in an immediate automatic administrative assessment of $500.00 per calendar day, compounding weekly without further warning or administrative hearing.',
        severity: 'high',
        category: 'Compounding Daily Penalties',
        riskExplanation: 'Compounding fines of $500 per day can escalate to $15,000+ in a single month without an evidentiary hearing.',
        potentialTrap: 'A delay in scheduling a municipal inspector could cause penalties to multiply into thousands of dollars.',
        recommendedAction: 'Contact the code officer immediately to schedule an inspection and request a formal 30-day compliance extension in writing.'
      },
      {
        id: 'gov-in-person-appeal',
        exactQuote: 'Any appeal of this determination must be filed in person at City Hall Suite 400 within exactly ten (10) calendar days of notice issuance, accompanied by a non-refundable $450 filing fee paid via certified bank draft. Written appeals submitted via regular mail, email, or telephone shall be summarily disregarded without tolling the deadline.',
        severity: 'high',
        category: 'Procedural Appeal Trap',
        riskExplanation: 'Disregarding mailed or emailed appeals creates a trap for anyone unable to appear in person within 10 days.',
        potentialTrap: 'Sending an email or letter will not stop the 10-day countdown; the deadline will pass and you lose your right to appeal.',
        recommendedAction: 'If contesting, obtain a bank draft and deliver appeal paperwork to Suite 400 with a date-stamped receipt.'
      },
      {
        id: 'gov-lien-auction',
        exactQuote: 'In the event accrued penalties and inspection re-examination fees remain unsatisfied for thirty (30) consecutive days, the City Treasurer will record a senior priority municipal tax lien against the real property, which may be sold at public auction without judicial foreclosure proceedings.',
        severity: 'high',
        category: 'Super-Priority Tax Lien & Auction',
        riskExplanation: 'Allows the city to encumber and auction your property after only 30 days without a judicial foreclosure court trial.',
        potentialTrap: 'Unresolved fines can cloud title and threaten ownership of the real estate.',
        recommendedAction: 'Resolve cited violations immediately and obtain a formal written Certificate of Compliance.'
      }
    ],
    actionChecklist: [
      {
        id: 'act-contact-inspector',
        action: 'Call code enforcement officer immediately and request a 30-day compliance extension in writing.',
        triggeredByClause: 'Failure to bring the parcel into verified compliance shall result in an immediate automatic administrative assessment of $500.00 per calendar day...',
        urgency: 'urgent',
        category: 'Clarify',
        questionToAsk: 'Hello Inspector, I received citation CE-2026-9812. I am actively working to resolve the issue. Can you grant a formal 30-day extension to abate and stay the daily penalties while contractors are scheduled?',
        clauseIdRef: 'gov-daily-penalty'
      },
      {
        id: 'act-file-appeal',
        action: 'If contesting, file in-person appeal at City Hall Suite 400 with $450 bank draft before day 10.',
        triggeredByClause: 'Any appeal of this determination must be filed in person at City Hall Suite 400 within exactly ten (10) calendar days...',
        urgency: 'urgent',
        category: 'File',
        questionToAsk: 'Can the City Clerk provide a time-stamped certified duplicate receipt acknowledging receipt of this appeal filing and bank draft?',
        clauseIdRef: 'gov-in-person-appeal'
      },
      {
        id: 'act-photo-proof',
        action: 'Take dated photographs of the parcel showing remediation progress.',
        triggeredByClause: '...revealed unpermitted exterior alterations and suspected accessory structure non-compliance...',
        urgency: 'important',
        category: 'Photograph',
        questionToAsk: 'Where can I email dated photos and contractor invoices for pre-inspection verification before the deadline?',
        clauseIdRef: 'gov-daily-penalty'
      }
    ],
    glossary: [
      { term: 'Abate', plainMeaning: 'To repair, remove, or bring an alleged code violation into legal compliance.' },
      { term: 'Senior Tax Lien', plainMeaning: 'A debt attached to real estate that takes first priority over mortgages and bank loans.' },
      { term: 'Tolling', plainMeaning: 'Pausing or suspending a legal clock or statutory deadline.' }
    ],
    analyzedAt: new Date().toISOString(),
    characterCount: 1600,
    matchedClausesCount: 3
  }
};

// Fallback rule-based scanner for custom documents
export function generateRuleBasedAnalysis(documentText: string, language: 'en' | 'hi' | 'ta' = 'en'): DocumentAnalysis {
  const lower = documentText.toLowerCase();

  let detectedType = 'General Legal Document';
  if (lower.includes('lease') || lower.includes('tenant') || lower.includes('landlord') || lower.includes('premises')) {
    detectedType = language === 'hi' ? 'आवासीय किराया अनुबंध (Lease)' : language === 'ta' ? 'குடியிருப்பு குத்தகை ஒப்பந்தம் (Lease)' : 'Residential Lease Agreement';
  } else if (lower.includes('patient') || lower.includes('surgical') || lower.includes('hospital') || lower.includes('medical')) {
    detectedType = language === 'hi' ? 'चिकित्सा सहमति पत्र (Medical Consent)' : language === 'ta' ? 'மருத்துவ ஒப்புதல் படிவம் (Medical Consent)' : 'Medical Consent / Treatment Agreement';
  } else if (lower.includes('violation') || lower.includes('citation') || lower.includes('municipal') || lower.includes('ordinance') || lower.includes('city')) {
    detectedType = language === 'hi' ? 'नगर निगम / सरकारी नोटिस' : language === 'ta' ? 'அரசு / நகராட்சி நோட்டீஸ்' : 'Government / Municipal Notice';
  } else if (lower.includes('employee') || lower.includes('employment') || lower.includes('employer')) {
    detectedType = language === 'hi' ? 'रोजगार अनुबंध (Employment Agreement)' : language === 'ta' ? 'வேலைவாய்ப்பு ஒப்பந்தம் (Employment Agreement)' : 'Employment Agreement';
  } else {
    detectedType = language === 'hi' ? 'सामान्य कानूनी / प्रशासनिक दस्तावेज़' : language === 'ta' ? 'பொது சட்ட / நிர்வாக ஆவணம்' : 'General Legal Document';
  }

  const sentences = documentText
    .split(/(?<=[.?!])\s+(?=[A-Z0-9])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25);

  const matchedClauses: any[] = [];
  const actionItems: any[] = [];
  const detectedDeadlines: any[] = [];

  // Detect explicit deadlines
  const deadlineRegexes = [
    { regex: /(\d+)\s*(days|calendar days|business days|months|hours)\s*(prior|notice|before|within)/i, title: 'Notice / Window Deadline' },
    { regex: /within\s*(\w+|\d+)\s*(days|hours|weeks|months)/i, title: 'Compliance Window' },
  ];

  for (const sentence of sentences) {
    for (const d of deadlineRegexes) {
      const match = sentence.match(d.regex);
      if (match && !detectedDeadlines.some((dl) => dl.exactTrigger === sentence)) {
        const title = language === 'hi' ? 'आवश्यक सूचना / समय-सीमा' : language === 'ta' ? 'அறிவிப்பு காலக்கெடு' : d.title;
        const consequence = language === 'hi' ? 'समय सीमा समाप्त होने से पूर्व आवश्यक कार्रवाई करें।' : language === 'ta' ? 'காலக்கெடு முடிவதற்குள் உரிய நடவடிக்கை தேவை.' : 'Action required before expiration of window.';
        detectedDeadlines.push({
          id: `dl-${detectedDeadlines.length + 1}`,
          title,
          timeframe: match[0],
          exactTrigger: sentence.length > 120 ? sentence.substring(0, 120) + '...' : sentence,
          consequenceIfMissed: consequence,
        });
        break;
      }
    }
  }

  const riskRules = [
    {
      keywords: ['automatically renew', 'automatic renewal', 'renew for a subsequent'],
      category: language === 'hi' ? 'स्वतः नवीनीकरण (Auto-Renewal)' : language === 'ta' ? 'தானியங்கி புதுப்பித்தல் (Auto-Renewal)' : 'Automatic Renewal',
      severity: 'high' as const,
      explanation: language === 'hi' ? 'यह शर्त आपको सीमित समय में रद्द न करने पर स्वतः लंबी अवधि के लिए अनुबंध में बांध देती है।' : language === 'ta' ? 'குறுகிய காலத்தில் ரத்து செய்யாவிடில் ஒப்பந்தத்தை தானாக நீட்டிக்கும் பொறி.' : 'Locks you into an automatic contract extension unless you cancel within a narrow window.',
      action: language === 'hi' ? 'स्वतः नवीनीकरण की शर्त को कटवाएं या कैलेंडर में अंतिम तारीख दर्ज करें।' : language === 'ta' ? 'தானியங்கி புதுப்பித்தலை நீக்கக் கோருங்கள் அல்லது காலெண்டரில் தேதியை குறித்து வையுங்கள்.' : 'Strike out the automatic renewal or calendar the exact non-renewal notice date.',
      trap: language === 'hi' ? 'समय चूकने पर अवांछित अवधि के लिए अनुबंध व वित्तीय बोझ थोपा जा सकता है।' : language === 'ta' ? 'தேதியை தவறவிட்டால் வேண்டாத நிதிச்சுமையில் மாட்டிக்கொள்ள நேரிடும்.' : 'You may be forced into an unwanted contract renewal and financial liability.',
      question: language === 'hi' ? 'क्या हम नवीनीकरण शर्त में संशोधन कर सकते हैं ताकि प्रारंभिक अवधि के बाद सामान्य 30 दिन के नोटिस पर अनुबंध जारी रहे?' : language === 'ta' ? 'ஆரம்ப காலத்திற்குப் பிறகு 30 நாள் அறிவிப்புடன் மாதம் தோறும் புதுப்பிக்கும்படி மாற்றலாமா?' : 'Can we amend the renewal clause so the contract converts to month-to-month after the initial term with standard 30-day notice?'
    },
    {
      keywords: ['forfeit', 'forfeiture of the entire security deposit', 'forfeiture of the deposit'],
      category: language === 'hi' ? 'सुरक्षा जमा राशि जब्ती (Deposit Forfeiture)' : language === 'ta' ? 'வைப்புத்தொகை பறிமுதல் (Deposit Forfeiture)' : 'Deposit Forfeiture',
      severity: 'high' as const,
      explanation: language === 'hi' ? 'बिना किसी विस्तृत बिल या रसीद के पूरी जमा राशि जब्त करने का दावा करता है।' : language === 'ta' ? 'முறையான கணக்கு அல்லது ரசீதுகள் இன்றி வைப்புத்தொகையை பறிமுதல் செய்ய முற்படுகிறது.' : 'Claims right to keep your deposit without fair accounting or itemized documentation.',
      action: language === 'hi' ? 'कानूनी जमा सुरक्षा की मांग करें और पहले दिन विस्तृत तस्वीरें लें।' : language === 'ta' ? 'சட்டப்பூர்வ வைப்புத்தொகை பாதுகாப்பை கோரி, புகைப்பட ஆதாரங்களை சேகரிக்கவும்.' : 'Demand statutory deposit protections and record detailed move-in photos.',
      trap: language === 'hi' ? 'सामान्य टूट-फूट के लिए भी आपकी जमा राशि हड़प ली जाएगी।' : language === 'ta' ? 'இயற்கையான தேய்மானத்திற்கு கூட வைப்புத்தொகை பறிபோகலாம்.' : 'Landlord keeps your deposit for normal, inevitable wear and tear.',
      question: language === 'hi' ? 'क्या हम पुष्टि कर सकते हैं कि कटौती केवल मदवार बिल के साथ होगी और सामान्य टूट-फूट को छूट रहेगी?' : language === 'ta' ? 'வைப்புத்தொகை பிடித்தத்திற்கு ரசீதுகள் கட்டாயம் மற்றும் சாதாரண தேய்மானத்திற்கு விலக்கு என உறுதிப்படுத்த முடியுமா?' : 'Could we confirm in writing that deposit deductions will follow statutory rules requiring itemized receipts, excluding normal wear?'
    },
    {
      keywords: ['full financial responsibility for all mechanical', 'hvac compressor', 'furnace', 'water heater'],
      category: language === 'hi' ? 'उपकरण व ढांचागत मरम्मत खर्च' : language === 'ta' ? 'இயந்திர மற்றும் பராமரிப்புச் செலவு' : 'Maintenance & Capital Expenses',
      severity: 'high' as const,
      explanation: language === 'hi' ? 'मकान मालिक के महंगे पूंजीगत उपकरणों को बदलने का खर्च आप पर डालता है।' : language === 'ta' ? 'உரிமையாளரின் விலை உயர்ந்த சாதனங்களை மாற்றும் செலவை உங்கள் மீது சுமத்துகிறது.' : 'Shifts major structural or appliance replacements onto you.',
      action: language === 'hi' ? 'स्पष्ट करें कि एसी, हीटर और पाइपलाइन का रखरखाव केवल मकान मालिक करेगा।' : language === 'ta' ? 'ஏசி மற்றும் கட்டமைப்பு பழுதுபார்ப்பிற்கு உரிமையாளரே பொறுப்பு என குறிப்பிடவும்.' : 'Clarify that property owner is strictly responsible for HVAC, plumbing, and structural items.',
      trap: language === 'hi' ? 'मकान मालिक की संपत्ति के लिए आपको हजारों डॉलर के नए उपकरण खरीदने पड़ेंगे।' : language === 'ta' ? 'உரிமையாளரின் சொத்திற்கு நீங்கள் ஆயிரக்கணக்கான டாலர் செலவிட நேரிடும்.' : 'You are forced to buy thousands of dollars in new appliances for the owner.',
      question: language === 'hi' ? 'क्या हम स्पष्ट कर सकते हैं कि किराएदार पहले से लगे मैकेनिकल या एसी उपकरणों को बदलने के लिए उत्तरदायी नहीं है?' : language === 'ta' ? 'பழைய இயந்திர சாதனங்களை மாற்றுவதற்கு வாடகைதாரர் பொறுப்பல்ல என எழுத்துப்பூர்வமாக சேர்க்கலாமா?' : 'Can we clarify in writing that tenant is not responsible for pre-existing mechanical, HVAC, or structural replacements?'
    },
    {
      keywords: ['at any hour', 'without prior notification', 'without prior notice', 'enter the premises at any hour'],
      category: language === 'hi' ? 'अवांछित / बिना पूर्व सूचना प्रवेश' : language === 'ta' ? 'முன்னறிவிப்பின்றி நுழைதல்' : 'Unannounced Entry',
      severity: 'high' as const,
      explanation: language === 'hi' ? 'बिना पूर्व सूचना के कभी भी प्रवेश की अनुमति देता है, जो आपकी निजता का उल्लंघन है।' : language === 'ta' ? 'முன்னறிவிப்பின்றி எந்த நேரத்திலும் நுழைய அனுமதித்து தனியுரிமையை பறிக்கிறது.' : 'Allows entry without standard advance notice, violating privacy and quiet enjoyment.',
      action: language === 'hi' ? 'आपातकाल के अलावा कम से कम 24 घंटे की पूर्व लिखित सूचना की मांग करें।' : language === 'ta' ? 'அவசர நிலை தவிர மற்ற நேரங்களில் 24 மணி நேர முன் அறிவிப்பைக் கட்டாயமாக்குங்கள்.' : 'Require at least 24 hours written notice before non-emergency entry.',
      trap: language === 'hi' ? 'अनजान कर्मचारी या खरीदार बिना बताए आपके निजी आवास में प्रवेश कर सकते हैं।' : language === 'ta' ? 'அறிவிப்பின்றி ஆட்கள் உங்கள் தனிப்பட்ட இல்லத்திற்குள் வரக்கூடும்.' : 'Staff or buyers entering your private residence unannounced.',
      question: language === 'hi' ? 'क्या हम सामान्य कार्य घंटों के दौरान गैर-आपातकालीन प्रवेश के लिए 24 घंटे की पूर्व सूचना को अनिवार्य कर सकते हैं?' : language === 'ta' ? 'அவசரமற்ற ஆய்வுகளுக்கு வேலை நாட்களில் 24 மணிநேர முன் அறிவிப்பு கட்டாயம் என்ற விதியை சேர்க்கலாமா?' : 'Could we require 24 hours advance written notice before any non-emergency entry during standard business hours?'
    },
    {
      keywords: ['binding arbitration', 'mandatory arbitration', 'waives all rights to trial by jury', 'waiver of jury trial'],
      category: language === 'hi' ? 'अदालती अधिकार त्याग व मध्यस्थता' : language === 'ta' ? 'நீதிமன்ற உரிமைத் துறப்பு & நடுவர் மன்றம்' : 'Dispute Resolution & Court Waiver',
      severity: 'amber' as const,
      explanation: language === 'hi' ? 'सार्वजनिक अदालत जाने से रोकता है और निजी मध्यस्थता के लिए मजबूर करता है।' : language === 'ta' ? 'நீதிமன்றத்தை அணுகுவதைத் தடுத்து தனியார் நடுவர் மன்றத்திற்கு கட்டாயப்படுத்துகிறது.' : 'Bars you from standard court proceedings and forces private arbitration.',
      action: language === 'hi' ? 'स्थानीय लघु वाद न्यायालय (Small Claims Court) में जाने का अधिकार सुरक्षित रखें।' : language === 'ta' ? 'உள்ளூர் சிறு வழக்கு நீதிமன்றத்தை அணுகும் உரிமையைத் தக்கவைத்துக் கொள்ளுங்கள்.' : 'Retain the right to file in local municipal small claims court.',
      trap: language === 'hi' ? 'मध्यस्थता की फीस विवाद की राशि से अधिक हो सकती है।' : language === 'ta' ? 'நடுவர் மன்ற கட்டணம் வழக்கின் மதிப்பை விட அதிகமாகும்.' : 'Arbitration fees can exceed the value of the legal dispute.',
      question: language === 'hi' ? 'क्या हम दोनों पक्षों के लिए स्थानीय लघु वाद न्यायालय में जाने का अधिकार सुरक्षित रख सकते हैं?' : language === 'ta' ? 'சிறிய வழக்குகளுக்கு உள்ளூர் நீதிமன்றத்தை அணுகும் உரிமையை இரு தரப்புக்கும் வழங்கலாமா?' : 'Can we reserve the right for either party to seek remedies in local municipal small claims court for minor disputes?'
    },
    {
      keywords: ['balance-billed', 'gross charge', 'out-of-network', 'surprise medical'],
      category: language === 'hi' ? 'आउट-ऑफ-नेटवर्क मेडिकल बिलिंग' : language === 'ta' ? 'எதிர்பாராத மருத்துவக் கட்டணம்' : 'Out-of-Network Billing',
      severity: 'high' as const,
      explanation: language === 'hi' ? 'सरप्राइज बिलिंग सुरक्षा का त्याग करवाकर अप्रत्याशित भारी बिलों के लिए उत्तरदायी बनाता है।' : language === 'ta' ? 'காப்பீடற்ற மருத்துவர்களின் முழு கட்டணங்களுக்கும் உங்களை பொறுப்பாக்குகிறது.' : 'Waives surprise billing protections, making you liable for uncapped out-of-network rates.',
      action: language === 'hi' ? 'लिखित में इन-नेटवर्क डॉक्टरों की पुष्टि लें और सरप्राइज बिलिंग छूट को अस्वीकार करें।' : language === 'ta' ? 'இன்-நெட்வொர்க் கவரேஜை எழுத்துப்பூர்வமாக உறுதிசெய்து கூடுதல் கட்டணங்களைத் தள்ளுபடி செய்யவும்.' : 'Confirm in-network coverage in writing and reject surprise billing waivers.',
      trap: language === 'hi' ? 'अस्पताल से हजारों डॉलर के अप्रत्याशित अतिरिक्त बिल प्राप्त होना।' : language === 'ta' ? 'ஆயிரக்கணக்கான டாலர் எதிர்பாராத மருத்துவ பில்கள் வரக்கூடும்.' : 'Receiving thousands of dollars in unexpected hospital bills.',
      question: language === 'hi' ? 'क्या आप लिखित में गारंटी दे सकते हैं कि सभी उपस्थित डॉक्टर बीमा नेटवर्क में शामिल हैं?' : language === 'ta' ? 'அனைத்து மருத்துவர்களும் காப்பீட்டு நெட்வொர்க்கில் உள்ளவர்களா என எழுத்துப்பூர்வ உறுதி அளிக்க முடியுமா?' : 'Can you guarantee in writing that all attending medical practitioners are participating in-network under the No Surprises Act?'
    },
    {
      keywords: ['releases and discharges', 'waiver of liability', 'ordinary negligence', 'procedural errors'],
      category: language === 'hi' ? 'लापरवाही से कानूनी मुक्ति (Liability Waiver)' : language === 'ta' ? 'அலட்சியத்திற்கான பொறுப்புத் துறப்பு' : 'Negligence & Liability Waiver',
      severity: 'high' as const,
      explanation: language === 'hi' ? 'लापरवाही या क्षति के लिए प्रदाता की कानूनी जवाबदेही समाप्त करने का प्रयास करता है।' : language === 'ta' ? 'அலட்சியம் அல்லது சேதத்திற்கான சட்டப்பூர்வ பொறுப்பை நீக்க முற்படுகிறது.' : 'Attempts to eliminate legal accountability for negligence or damage.',
      action: language === 'hi' ? 'हस्ताक्षर करने से पहले लापरवाही छूट की शर्त को पूरी तरह काट दें।' : language === 'ta' ? 'கையெழுத்திடுவதற்கு முன் அலட்சியப் பொறுப்புத் துறப்பு வரிகளை அடித்து விடுங்கள்.' : 'Cross out liability waivers for negligence before signing.',
      trap: language === 'hi' ? 'लापरवाही से चोट लगने पर भी आप कोई हर्जाना या दावा नहीं कर पाएंगे।' : language === 'ta' ? 'பாதிப்பு ஏற்பட்டாலும் இழப்பீடு கோர முடியாத நிலை உருவாகும்.' : 'Inability to seek damages if injured due to provider fault.',
      question: language === 'hi' ? 'मैं लापरवाही से छूट वाली इस धारा को हटाना चाहता हूँ। क्या हम इस बदलाव पर हस्ताक्षर कर सकते हैं?' : language === 'ta' ? 'அலட்சியப் பொறுப்புத் துறப்பை நீக்க விரும்புகிறேன். இதற்கு ஒப்புதல் அளிக்கலாமா?' : 'I would like to strike the broad negligence waiver in this section before signing. Can we initial this change?'
    },
    {
      keywords: ['per calendar day', 'compounding weekly', 'civil penalty', 'statutory lien'],
      category: language === 'hi' ? 'दैनिक चक्रवृद्धि जुर्माना एवं ग्रहणाधिकार' : language === 'ta' ? 'தினசரி கூட்டு அபராதம் & பற்றுரிமை' : 'Compounding Penalties & Liens',
      severity: 'high' as const,
      explanation: language === 'hi' ? 'प्रतिदिन बढ़ता हुआ भारी जुर्माना और संपत्ति पर लीन लगाने की शक्ति देता है।' : language === 'ta' ? 'நாள்தோறும் கூடும் அபராதம் மற்றும் சொத்து பறிமுதல் அபாயத்தை ஏற்படுத்துகிறது.' : 'Imposes escalating daily fines and potential property liens.',
      action: language === 'hi' ? 'समय पर लिखित जवाब दें या जुर्माने पर रोक के लिए 30 दिन का विस्तार मांगें।' : language === 'ta' ? 'அபராதத்தை நிறுத்த உடனடியாக 30 நாள் அவகாச நீட்டிப்பைக் கோருங்கள்.' : 'File a timely written response or request a 30-day compliance extension.',
      trap: language === 'hi' ? 'जुर्माना तेजी से हजारों डॉलर में बदल सकता है।' : language === 'ta' ? 'அபராதம் வேகமாக பல்லாயிரக்கணக்கான டாலர்களாக உயரக்கூடும்.' : 'Fines multiplying rapidly into thousands of dollars.',
      question: language === 'hi' ? 'काम चलने के दौरान जुर्माने को रोकने के लिए क्या हम 30 दिन का समय विस्तार ले सकते हैं?' : language === 'ta' ? 'வேலை நடக்கும் போது அபராதத்தை நிறுத்தி வைக்க 30 நாள் அவகாசம் தர முடியுமா?' : 'Can we formally request a 30-day extension to abate and stay any penalty escalation while work is underway?'
    },
    {
      keywords: ['informal email notice', 'guest', 'registration fee', 'inspection'],
      category: language === 'hi' ? 'प्रशासनिक व नीतिगत नियम' : language === 'ta' ? 'நிர்வாக மற்றும் கொள்கை விதி' : 'Administrative Advisory',
      severity: 'yellow' as const,
      explanation: language === 'hi' ? 'सख्त प्रशासनिक नियम जिसकी पुष्टि करना आवश्यक है।' : language === 'ta' ? 'சரிபார்க்க வேண்டிய கடுமையான நிர்வாக விதிமுறை.' : 'Strict policy or administrative requirement to verify before proceeding.',
      action: language === 'hi' ? 'सटीक नियमों की पुष्टि करें और डिजिटल रसीदें सुरक्षित रखें।' : language === 'ta' ? 'முறையான நடைமுறைகளை உறுதிசெய்து ரசீதுகளை பாதுகாக்கவும்.' : 'Verify exact compliance steps and retain digital receipts.',
      trap: language === 'hi' ? 'अनजाने में तकनीकी नियमों का उल्लंघन हो जाना।' : language === 'ta' ? 'தெரியாமல் விதியை மீறி அபராதம் வரக்கூடும்.' : 'Accidental technical violation of administrative rules.',
      question: language === 'hi' ? 'क्या आप इस धारा के पालन हेतु आवश्यक दस्तावेज़ों और नोटिस को स्पष्ट कर सकते हैं?' : language === 'ta' ? 'இந்த விதியை பின்பற்ற என்ன ஆவணங்கள் மற்றும் அறிவிப்பு தேவை என தெளிவுபடுத்த முடியுமா?' : 'Could you clarify the exact documentation and notice needed to maintain compliance with this clause?'
    }
  ];

  sentences.forEach((sentence) => {
    const sentLower = sentence.toLowerCase();
    for (const rule of riskRules) {
      if (rule.keywords.some((kw) => sentLower.includes(kw))) {
        if (!matchedClauses.some((c) => c.exactQuote === sentence)) {
          const clauseId = `rule-clause-${matchedClauses.length + 1}`;
          matchedClauses.push({
            id: clauseId,
            exactQuote: sentence,
            severity: rule.severity,
            category: rule.category,
            riskExplanation: rule.explanation,
            recommendedAction: rule.action,
            potentialTrap: rule.trap,
          });

          actionItems.push({
            id: `rule-act-${actionItems.length + 1}`,
            action: rule.action,
            triggeredByClause: sentence.length > 90 ? sentence.substring(0, 90) + '...' : sentence,
            urgency: rule.severity === 'high' ? 'urgent' : rule.severity === 'amber' ? 'important' : 'recommended',
            category: language === 'hi' ? 'जरूरी कदम' : language === 'ta' ? 'செயல் திட்டம்' : 'Action Item',
            questionToAsk: rule.question,
            clauseIdRef: clauseId,
          });
          break;
        }
      }
    }
  });

  const highCount = matchedClauses.filter((c) => c.severity === 'high').length;
  const amberCount = matchedClauses.filter((c) => c.severity === 'amber').length;
  const riskScore = Math.min(10, Math.max(2, highCount * 2.5 + amberCount * 1.5 + 2));

  let riskVerdict = language === 'hi' ? 'मानक दस्तावेज़ — कम जोखिम' : language === 'ta' ? 'வழக்கமான ஆவணம் — குறைந்த ஆபத்து' : 'Standard Document — Low Risk Detected';
  if (riskScore >= 7) {
    riskVerdict = language === 'hi'
      ? 'गंभीर जोखिम व एकतरफा शर्तें मौजूद — हस्ताक्षर से पहले संशोधन कराएं'
      : language === 'ta'
      ? 'அதிக ஆபத்தான & ஒருதலைப்பட்ச விதிகள் உள்ளன — கையெழுத்திடும் முன் மாற்றவும்'
      : 'Significant Risk & Unilateral Terms Detected — Negotiate Before Agreeing';
  } else if (riskScore >= 5) {
    riskVerdict = language === 'hi'
      ? 'मध्यम सावधानी आवश्यक — मुख्य हाइलाइट किए गए क्लॉज की समीक्षा करें'
      : language === 'ta'
      ? 'நடுத்தர எச்சரிக்கை தேவை — முக்கிய விதிகளின் விவரங்களை கவனிக்கவும்'
      : 'Moderate Caution Advised — Review Key Highlighted Clauses';
  }

  let plainLanguageSummary = '';
  if (language === 'hi') {
    plainLanguageSummary = `इस दस्तावेज़ में ऐसी बाध्यकारी कानूनी शर्तें हैं जिन पर विशेष ध्यान देने की आवश्यकता है।\n\n${
      matchedClauses.length > 0
        ? `हमारे स्कैन में संभावित वित्तीय या कानूनी जोखिम वाले ${matchedClauses.length} क्लॉज पाए गए हैं, विशेष रूप से: ${matchedClauses.map((c) => c.category).slice(0, 3).join(', ')}।`
        : 'दस्तावेज़ में मानक भाषा का उपयोग किया गया है, फिर भी नोटिस की अवधि और रद्दीकरण की शर्तों की जांच अवश्य करें।'
    }\n\nनीचे दिए गए हाइलाइट क्लॉज देखें और आत्मविश्वास से बातचीत करने के लिए तैयार प्रश्नों का उपयोग करें।`;
  } else if (language === 'ta') {
    plainLanguageSummary = `இந்த ஆவணத்தில் கவனமாக பரிசீலிக்க வேண்டிய சட்டப்பூர்வ கட்டுப்பாடுகள் உள்ளன.\n\n${
      matchedClauses.length > 0
        ? `எங்கள் ஆய்வில் சாத்தியமான நிதி அல்லது சட்ட அபாயங்கள் கொண்ட ${matchedClauses.length} விதிமுறைகள் கண்டறியப்பட்டுள்ளன: ${matchedClauses.map((c) => c.category).slice(0, 3).join(', ')}.`
        : 'ஆவணத்தில் வழக்கமான சொற்கள் பயன்படுத்தப்பட்டுள்ளன, இருப்பினும் அறிவிப்பு அவகாசங்களை கவனமாக சரிபார்க்கவும்.'
    }\n\nகீழே சிறப்பிக்கப்பட்டுள்ள விதிகளைப் படித்து ஆபத்துக்களைப் புரிந்து கொள்ளுங்கள், பேச்சுவார்த்தைக்கான ஆயத்த கேள்விகளைப் பயன்படுத்துங்கள்.`;
  } else {
    plainLanguageSummary = `This document contains binding terms that require careful attention.\n\n${
      matchedClauses.length > 0
        ? `Our scan flagged ${matchedClauses.length} clause${matchedClauses.length > 1 ? 's' : ''} with potential legal or financial traps, primarily regarding ${matchedClauses.map((c) => c.category).slice(0, 3).join(', ')}.`
        : 'The document uses conventional language, but make sure to review notice windows and cancellation terms.'
    }\n\nTake advantage of the highlighted clauses below to understand your risks, and use the ready-to-copy questions to negotiate with confidence.`;
  }

  const defaultAction1 = language === 'hi'
    ? { id: 'default-act-1', action: 'सभी नोटिस समय-सीमा और रद्दीकरण शर्तों को ध्यान से पढ़ें।', triggeredByClause: 'मानक संविदात्मक दायित्व', urgency: 'important' as const, category: 'सत्यापन', questionToAsk: 'क्या आप इस अनुबंध के लिए रद्दीकरण प्रक्रिया और नोटिस अवधि को स्पष्ट कर सकते हैं?' }
    : language === 'ta'
    ? { id: 'default-act-1', action: 'அனைத்து காலக்கெடு மற்றும் ரத்து செய்யும் விதிகளை கவனமாகப் படியுங்கள்.', triggeredByClause: 'வழக்கமான ஒப்பந்த கடமைகள்', urgency: 'important' as const, category: 'சரிபார்', questionToAsk: 'இந்த ஒப்பந்தத்தின் ரத்து செய்யும் நடைமுறை மற்றும் அறிவிப்பு காலத்தை தெளிவுபடுத்த முடியுமா?' }
    : { id: 'default-act-1', action: 'Read all notice deadlines and cancellation terms carefully.', triggeredByClause: 'Standard contractual obligations', urgency: 'important' as const, category: 'Verify', questionToAsk: 'Could you clarify the exact cancellation process and notice period for this agreement?' };

  const defaultAction2 = language === 'hi'
    ? { id: 'default-act-2', action: 'अपने रिकॉर्ड के लिए हस्ताक्षरित और दिनांकित प्रति सुरक्षित रखें।', triggeredByClause: 'दस्तावेज़ निष्पादन', urgency: 'recommended' as const, category: 'रिकॉर्ड', questionToAsk: 'क्या आप मेरे रिकॉर्ड के लिए हस्ताक्षरित पीडीएफ प्रति प्रदान कर सकते हैं?' }
    : language === 'ta'
    ? { id: 'default-act-2', action: 'உங்கள் பதிவிற்காக கையொப்பமிடப்பட்ட நகலை பாதுகாக்கவும்.', triggeredByClause: 'ஆவண நடைமுறைப்படுத்தல்', urgency: 'recommended' as const, category: 'பதிவு', questionToAsk: 'எனது தனிப்பட்ட பதிவிற்காக கையொப்பமிட்ட PDF நகலைத் தர முடியுமா?' }
    : { id: 'default-act-2', action: 'Keep a signed and dated copy for your records.', triggeredByClause: 'Document execution', urgency: 'recommended' as const, category: 'Record', questionToAsk: 'Can you provide a countersigned PDF copy for my personal records?' };

  const glossaryItems = language === 'hi' ? [
    { term: 'Indemnification (क्षतिपूर्ति)', plainMeaning: 'वित्तीय नुकसान या कानूनी दावों से दूसरे पक्ष की रक्षा करने या हर्जाना भरने का समझौता।' },
    { term: 'Arbitration (मध्यस्थता)', plainMeaning: 'सरकारी अदालत जाने के बजाय निजी मध्यस्थ के समक्ष विवाद का निपटारा करना।' },
    { term: 'Waiver (अधिकार त्याग)', plainMeaning: 'स्वेच्छा से किसी ज्ञात कानूनी अधिकार या सुरक्षा को छोड़ना।' }
  ] : language === 'ta' ? [
    { term: 'Indemnification (இழப்பீட்டு உத்தரவாதம்)', plainMeaning: 'நிதி இழப்பு அல்லது சட்டப்பூர்வ வழக்குகளிலிருந்து மற்ற தரப்பைப் பாதுகாக்கும் ஒப்பந்தம்.' },
    { term: 'Arbitration (நடுவர் மன்றம்)', plainMeaning: 'பொது நீதிமன்றத்திற்குச் செல்லாமல் தனியார் நடுவர் முன் வழக்கை முடித்தல்.' },
    { term: 'Waiver (உரிமைத் துறப்பு)', plainMeaning: 'ஒரு சட்டப்பூர்வ உரிமையை தாமாக முன்வந்து கைவிடுதல்.' }
  ] : [
    { term: 'Indemnification', plainMeaning: 'An agreement to reimburse or protect the other party against financial loss or legal claims.' },
    { term: 'Arbitration', plainMeaning: 'Resolving disputes privately before an arbitrator instead of going to public civil court.' },
    { term: 'Waiver', plainMeaning: 'Voluntarily relinquishing a known legal right, claim, or statutory protection.' }
  ];

  return {
    documentType: detectedType,
    overallRiskLevel: riskScore >= 7 ? 'high' : riskScore >= 4 ? 'moderate' : 'low',
    riskScore: Math.round(riskScore),
    riskVerdict,
    plainLanguageSummary,
    keyTakeaways: matchedClauses.slice(0, 4).map((c) => `${c.category}: ${c.riskExplanation}`),
    riskyClauses: matchedClauses,
    actionChecklist: actionItems.length > 0 ? actionItems : [defaultAction1, defaultAction2],
    deadlines: detectedDeadlines,
    glossary: glossaryItems,
    analyzedAt: new Date().toISOString(),
    characterCount: documentText.length,
    matchedClausesCount: matchedClauses.length,
    language,
  };
}
