export interface SampleDoc {
  id: string;
  name: string;
  tag: string;
  description: string;
  text: string;
}

export const SAMPLE_RENTAL_AGREEMENT: SampleDoc = {
  id: 'rental-agreement',
  name: 'Standard Residential Lease Agreement',
  tag: 'Legal / Housing',
  description: 'A 12-month lease packed with subtle traps: automatic 24-month renewal, HVAC replacement liability, entry without notice, and deposit forfeiture.',
  text: `STANDARD RESIDENTIAL LEASE AGREEMENT

THIS LEASE AGREEMENT (hereinafter referred to as the "Agreement") is entered into this 1st day of November, 2026, by and between APEX REALTY HOLDINGS LLC (hereinafter "Landlord") and JOHN DOE (hereinafter "Tenant").

1. PREMISES & TERM
Landlord hereby leases to Tenant the premises located at 742 Evergreen Terrace, Unit 4B. The initial term shall commence on December 1, 2026 and expire on November 30, 2027. Unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and twenty (120) days prior to the expiration date, this Lease shall automatically renew for a subsequent fixed term of twenty-four (24) months at an increased monthly rent of twenty-five percent (25%).

2. RENT AND FEES
Tenant agrees to pay Landlord $2,450.00 on the first calendar day of each month. In the event payment is received after 5:00 PM on the second calendar day of the month, Tenant shall immediately incur a late penalty of $175.00 plus $35.00 per diem until full satisfaction. Landlord reserves the unilateral right to adjust monthly base rent at any time upon fourteen (14) days informal email notice to offset rising building operational costs.

3. SECURITY DEPOSIT AND FORFEITURE
Tenant shall deposit $4,900.00 upon execution. Tenant acknowledges that any scratch, blemish, scuff, or normal wear and tear on flooring, countertops, or walls shall result in immediate and complete forfeiture of the entire security deposit without itemized accounting or receipt obligations by Landlord. Furthermore, Tenant agrees that repair costs exceeding the deposit will be billed at an emergency rate of $150 per hour.

4. MAINTENANCE, REPAIRS, AND APPLIANCES
Tenant explicitly covenants to assume full financial responsibility for all mechanical systems, including replacement or overhaul of the furnace, HVAC compressor, water heater, and electrical wiring, irrespective of pre-existing age or natural component failure. Landlord shall bear zero liability for utility disruptions, heating loss, or water damage caused by burst plumbing.

5. ENTRY AND INSPECTIONS
Landlord and Landlord's designated agents, contractors, and prospective buyers reserve the absolute right to enter the Premises at any hour of the day or night without prior notification to Tenant, and Landlord may retain and duplicate Tenant's personal keys without consent.

6. WAIVER OF JURY TRIAL & MANDATORY ARBITRATION
Tenant irrevocably waives all rights to trial by jury, class action participation, and local municipal tenant-landlord court remedies. All disputes arising under this agreement must be submitted to binding private arbitration located in Wilmington, Delaware, with all initial non-refundable administrative filing fees of $3,500.00 paid solely by Tenant.

7. PETS AND GUESTS
No domestic animals or service animals are permitted without prior written consent and payment of a $1,000 non-refundable registration fee. Any visiting guest remaining in the Premises for more than forty-eight (48) cumulative hours within any thirty-day period shall be deemed an unauthorized subtenant, subjecting Tenant to immediate 24-hour summary eviction.

IN WITNESS WHEREOF, the parties execute this Agreement as of the date first above written.`
};

export const SAMPLE_DOCUMENTS: SampleDoc[] = [
  SAMPLE_RENTAL_AGREEMENT,
  {
    id: 'medical-consent',
    name: 'Hospital Outpatient Surgical Consent',
    tag: 'Medical / Healthcare',
    description: 'An outpatient surgery intake form with broad liability waivers, third-party billing consent, and arbitration clauses.',
    text: `VALLEY MEMORIAL HEALTH SYSTEM
OUTPATIENT SURGICAL TREATMENT & INFORMED CONSENT FORM

PATIENT: JANE SMITH | PROCEDURE: DIAGNOSTIC ARTHROSCOPY | DATE: OCTOBER 15, 2026

1. CONSENT TO TREATMENT & UNFORESEEN EXPANSION
I hereby authorize Dr. Martinez and such surgical associates, assistants, and hospital staff as may be selected by the facility to perform the indicated procedure. I acknowledge that during the operation, unforeseen conditions may necessitate additional or altered procedures, and I grant unconditional consent to any amputation, excision, or surgical variation deemed convenient by the attending staff.

2. FINANCIAL LIABILITY & OUT-OF-NETWORK COVERAGE
Patient acknowledges that independent contracting physicians, including but not limited to anesthesiologists, pathologists, radiologists, and surgical scrub nurses, do not participate in Patient's primary insurance network. Patient explicitly agrees to accept complete personal financial responsibility for all balance-billed charges at 100% of the Hospital's master gross charge list, waiving any statutory surprise medical billing caps.

3. RELEASE OF CLAIMS & WAIVER OF LIABILITY
Patient forever releases and discharges Hospital, its executives, attending physicians, and vendor representatives from any and all liability for personal injury, hospital-acquired bacterial infections, procedural errors, equipment malfunction, or nerve damage, whether caused by ordinary negligence or systemic facility oversight.

4. MEDIA AND ANATOMICAL TISSUE ASSIGNMENT
Patient irrevocably transfers all property, patent, and commercial rights in any excised bodily tissue, blood, genetic sequence, or organs to Hospital's commercial research affiliate. Furthermore, Patient consents to unredacted video and photographic recording of the procedure for worldwide promotional and educational distribution across public digital media channels without compensation or anonymity.

5. BINDING ARBITRATION OF MEDICAL DISPUTES
In lieu of any civil judicial proceedings or medical malpractice jury trials, Patient and Patient's heirs agree that any claim exceeding $1,000 shall be resolved exclusively through private binding arbitration before a single arbitrator appointed by Hospital's legal counsel.`
  },
  {
    id: 'government-notice',
    name: 'Municipal Code Enforcement Citation',
    tag: 'Government / Municipal',
    description: 'An administrative compliance citation with tight appeal windows, compounding daily fines, and property lien threats.',
    text: `DEPARTMENT OF BUILDING & CODE ENFORCEMENT
CITY OF METROPOLIS — OFFICIAL NOTICE OF ADMINISTRATIVE VIOLATION

CASE NUMBER: CE-2026-9812 | PARCEL ID: 44-098-11 | ISSUED: NOVEMBER 2, 2026
RECIPIENT: RECORD PROPERTY OWNER — 104 MAPLE STREET

NOTICE TO REMEDY DEFECTS AND IMMINENT CIVIL PENALTY ASSESSMENT:
An official physical inspection conducted on October 28, 2026 revealed unpermitted exterior alterations and suspected accessory structure non-compliance under Municipal Ordinance § 18-A.

MANDATORY TIMELINE FOR COMPLIANCE:
You are hereby ordered to abate all cited conditions within seven (7) business days of the postmarked date of this notice. Failure to bring the parcel into verified compliance shall result in an immediate automatic administrative assessment of $500.00 per calendar day, compounding weekly without further warning or administrative hearing.

RIGHT OF ADMINISTRATIVE APPEAL:
Any appeal of this determination must be filed in person at City Hall Suite 400 within exactly ten (10) calendar days of notice issuance, accompanied by a non-refundable $450 filing fee paid via certified bank draft. Written appeals submitted via regular mail, email, or telephone shall be summarily disregarded without tolling the deadline.

IMPOSITION OF STATUTORY LIEN AND FORECLOSURE:
In the event accrued penalties and inspection re-examination fees remain unsatisfied for thirty (30) consecutive days, the City Treasurer will record a senior priority municipal tax lien against the real property, which may be sold at public auction without judicial foreclosure proceedings.`
  }
];
