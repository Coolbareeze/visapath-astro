export const checked = '14 November 2026';
export const visaFees = [
  { country: 'UK', type: 'Standard Visitor (up to 6 months)', amount: 135, currency: 'GBP', source: 'https://www.gov.uk/standard-visitor', note: 'Base application fee; optional services are separate.' },
  { country: 'UK', type: 'Student (outside the UK)', amount: 558, currency: 'GBP', source: 'https://www.gov.uk/student-visa', note: 'Healthcare surcharge and optional services are separate.' },
  { country: 'USA', type: 'B1/B2 visitor', amount: 185, currency: 'USD', source: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html', note: 'Application fee; check any issuance or other applicable charges separately.' },
  { country: 'USA', type: 'F-1 student', amount: 185, currency: 'USD', source: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html', note: 'SEVIS and any issuance or other applicable charges are separate.' },
  { country: 'Canada', type: 'Visitor / super visa (per person)', amount: 100, currency: 'CAD', source: 'https://ircc.canada.ca/english/information/fees/fees.asp', note: 'Biometrics may be payable separately; family caps and exemptions may apply.' },
  { country: 'Canada', type: 'Study permit (per person)', amount: 150, currency: 'CAD', source: 'https://ircc.canada.ca/english/information/fees/fees.asp', note: 'Biometrics and other applicable costs are separate.' },
  { country: 'Schengen', type: 'Short stay — adult standard fee', amount: 90, currency: 'EUR', source: 'https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en', note: 'Fee reductions/exemptions depend on circumstances. Application-centre charges may apply.' },
  { country: 'Schengen', type: 'Short stay — child aged 6 to under 12', amount: 45, currency: 'EUR', source: 'https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en', note: 'Check age and exemption rules with the responsible consulate.' },
];
export const otherFeeSources = [
  ['Australia', 'https://immi.homeaffairs.gov.au/visas/visa-pricing-estimator'],
  ['UAE', 'https://u.ae/en/information-and-services/visa-and-emirates-id/visit-visas'],
  ['Türkiye', 'https://www.evisa.gov.tr/'],
  ['Thailand', 'https://www.thaievisa.go.th/'],
  ['Malaysia', 'https://malaysiavisa.imi.gov.my/'],
  ['Saudi Arabia', 'https://ksavisa.sa/'],
];
