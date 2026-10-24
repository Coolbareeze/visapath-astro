import { useState } from 'react';

const DATA = {
  UK: {
    'Standard Visitor': { standard: '15 working days', priority: '5 working days (+£500)', super: '1 working day (+£1,000)' },
    'Student': { standard: '3 weeks', priority: '5 working days (+£500)', super: '1 working day (+£1,000)' },
    'Skilled Worker': { standard: '3 weeks', priority: '5 working days (+£500)', super: '1 working day (+£1,000)' },
    'Family / Settlement': { standard: '12 weeks (up to 24 weeks)', priority: '30 working days (+£573)', super: '5 working days (+£1,019)' },
  },
  USA: {
    'B1/B2 Interview': { standard: 'Varies by post — weeks to over a year wait', priority: 'Expedite request possible for medical/business emergency', super: 'N/A' },
    'F1 Student': { standard: '2–4 weeks after interview', priority: 'N/A', super: 'N/A' },
    'H1B': { standard: '2–6 months', priority: 'Premium Processing: 15 days (+$2,805)', super: 'N/A' },
    'Interview Waiver (Dropbox)': { standard: '3–6 weeks', priority: 'N/A', super: 'N/A' },
  },
  Canada: {
    'Visitor Visa (TRV)': { standard: '4–8 weeks', priority: 'N/A', super: 'N/A' },
    'Study Permit': { standard: '8–12 weeks', priority: 'SDS stream: 20 calendar days (if eligible)', super: 'N/A' },
    'Work Permit': { standard: '8–16 weeks', priority: 'Global Talent Stream: 2 weeks (for sponsors)', super: 'N/A' },
    'Super Visa': { standard: '4–10 weeks', priority: 'N/A', super: 'N/A' },
  },
  Schengen: {
    'Short-stay (Type C)': { standard: '15 calendar days', priority: 'Extended to 45 days in complex cases', super: 'N/A' },
    'National (Type D)': { standard: 'Varies 1–3 months by country', priority: 'N/A', super: 'N/A' },
  },
  UAE: {
    'Tourist e-Visa': { standard: '3–5 working days', priority: '24 hours (urgent service)', super: 'N/A' },
  },
  Turkey: {
    'e-Visa': { standard: 'Minutes to 24 hours', priority: 'N/A', super: 'N/A' },
  },
  'Saudi Arabia': {
    'Tourist e-Visa': { standard: '1–3 working days', priority: 'Same day in some cases', super: 'N/A' },
    'Umrah Visa': { standard: '2–7 working days via agent', priority: 'N/A', super: 'N/A' },
  },
  Thailand: {
    'Tourist (TR)': { standard: '5–10 working days', priority: 'N/A', super: 'N/A' },
    'Visa Exempt / VOA': { standard: 'On arrival', priority: 'N/A', super: 'N/A' },
  },
  Malaysia: {
    'eVISA': { standard: '2–3 working days', priority: 'Expedited possible via agent', super: 'N/A' },
  },
};

export default function ProcessingTimeLookup() {
  const [country, setCountry] = useState('UK');
  const [visaType, setVisaType] = useState('Standard Visitor');

  const countries = Object.keys(DATA);
  const visaTypes = Object.keys(DATA[country]);
  const info = DATA[country][visaType] || DATA[country][visaTypes[0]];

  const onCountryChange = (c) => {
    setCountry(c);
    setVisaType(Object.keys(DATA[c])[0]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <select value={country} onChange={(e) => onCountryChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
          <select value={visaType} onChange={(e) => setVisaType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {visaTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500 mb-1">Standard</div>
          <div className="text-lg font-semibold text-gray-900">{info.standard}</div>
        </div>
        {info.priority !== 'N/A' && (
          <div className="bg-brand-50 border border-brand-500 rounded-lg p-4">
            <div className="text-sm font-medium text-brand-600 mb-1">Priority</div>
            <div className="text-lg font-semibold text-gray-900">{info.priority}</div>
          </div>
        )}
        {info.super !== 'N/A' && (
          <div className="bg-green-50 border border-green-500 rounded-lg p-4">
            <div className="text-sm font-medium text-green-700 mb-1">Super Priority</div>
            <div className="text-lg font-semibold text-gray-900">{info.super}</div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Processing times are estimates and vary based on application volume and completeness. Submit well ahead of travel.
      </p>
    </div>
  );
}
