import { useState } from 'react';

const CHECKLISTS = {
  'UK Visitor Visa': [
    'Passport valid for the entire planned stay with 1 blank page',
    'Previous passports (if any)',
    'Confirmation of online application (VAF)',
    'Visa fee payment confirmation',
    'IHS payment confirmation (if applicable)',
    'Appointment confirmation at UKVCAS/VFS',
    'Recent passport-size photographs (meeting UKVI specification)',
    'Bank statements — 6 months, personal account',
    'Salary slips — 6 months',
    'Employment letter stating position, salary, leave approval',
    'Business documents (if self-employed): SECP certificate, NTN, tax returns',
    'Property documents (if applicable)',
    'Hotel bookings covering full stay',
    'Return flight itinerary (hold, not purchased)',
    'Day-by-day travel itinerary',
    'Invitation letter from UK host (if visiting family/friends)',
    'Host\'s UK passport/BRP/driving licence copy',
    'Host\'s council tax bill or utility bill',
    'Host\'s bank statements (if sponsoring)',
    'CNIC original and copy',
    'Family registration certificate (FRC)',
    'Marriage certificate (if applicable)',
    'Children\'s birth certificates (if traveling with family)',
    'Travel insurance (recommended, not mandatory)',
  ],
  'US B1/B2 Visa': [
    'Passport valid for 6+ months beyond intended stay',
    'DS-160 confirmation page with barcode',
    'MRV fee receipt ($185)',
    'Interview appointment letter',
    'Recent passport photo (2x2 inches, white background, 6 months old or newer)',
    'Previous US visas (if any)',
    'Bank statements — 6 months with closing balance',
    'Property documents to show ties to Pakistan',
    'Business registration (if self-employed)',
    'Salary slips and employment letter',
    'Tax returns — last 2 years',
    'Family details: spouse, children, parents documents',
    'Marriage certificate (if applicable)',
    'Invitation letter from US host (if applicable)',
    'Host\'s I-94, visa status, or green card copy',
    'Travel itinerary (not required but helpful)',
    'Previous travel history evidence (visa pages, stamps)',
  ],
  'Schengen Tourist Visa': [
    'Passport valid for 3 months beyond return, issued within last 10 years, with 2 blank pages',
    'Completed Schengen visa application form (signed)',
    '2 recent biometric photos (35x45mm, white background)',
    'Visa fee €90 (adults)',
    'Round-trip flight reservation (not purchased ticket)',
    'Hotel bookings for entire stay',
    'Travel insurance with €30,000 medical coverage valid in all Schengen states',
    'Cover letter stating purpose, itinerary, who pays',
    'Day-by-day itinerary with places visited',
    'Bank statements — last 3 months with stamp',
    'Salary slips — last 3 months',
    'Employment letter (NOC, salary, position, leave dates)',
    'Business documents if self-employed (SECP, NTN, tax returns)',
    'Property documents (if applicable)',
    'Previous Schengen visas (if any)',
    'CNIC copy',
    'Family registration certificate (FRC)',
    'Children\'s birth certificates (if under 18 traveling)',
    'Consent letter from parent(s) if minor travels alone or with one parent',
    'Marriage certificate (if applicable)',
  ],
  'Canada Visitor Visa': [
    'Passport valid for duration of stay',
    'Previous passports',
    'IMM 5257 application form (signed)',
    'Biometric fee receipt (CAD $85)',
    'Visa fee receipt (CAD $100)',
    'Family Information form (IMM 5645)',
    '2 recent passport photos (per Canadian spec)',
    'Letter of invitation from Canadian host (if any) + their status proof',
    'Bank statements — 4 months',
    'Property documents',
    'Employment letter / business documents',
    'Tax returns — 2 years',
    'CNIC + FRC',
    'Marriage certificate (if applicable)',
    'Travel itinerary and hotel bookings',
    'Travel insurance (recommended)',
  ],
  'UAE Tourist Visa': [
    'Passport scan (color) valid 6+ months',
    'Recent photograph (passport style, white background)',
    'Confirmed return flight ticket',
    'Hotel booking or UAE address',
    'Bank statement — last 3 months',
    'Travel insurance (recommended)',
    'Sponsor documents if applied through airline/hotel',
  ],
  'Turkey e-Visa': [
    'Passport valid 6+ months with 1 blank page',
    'Completed online e-Visa application',
    'Visa fee payment ($60)',
    'Printed e-Visa (carry on arrival)',
    'Return flight ticket (recommended)',
    'Hotel booking (recommended)',
  ],
  'Thailand Tourist Visa': [
    'Passport valid 6+ months with 2 blank pages',
    'Completed TM-87 application form',
    'Recent 4x6cm photograph',
    'Confirmed flight tickets (in and out)',
    'Hotel booking or Thai address',
    'Bank statement showing 20,000 THB per person',
    'Employment letter',
  ],
};

export default function DocumentChecklist() {
  const [visa, setVisa] = useState('Schengen Tourist Visa');
  const [checked, setChecked] = useState({});

  const items = CHECKLISTS[visa];
  const key = (i) => `${visa}-${i}`;

  const toggle = (i) => {
    setChecked({ ...checked, [key(i)]: !checked[key(i)] });
  };

  const completedCount = items.filter((_, i) => checked[key(i)]).length;
  const percent = Math.round((completedCount / items.length) * 100);

  const resetAll = () => setChecked({});

  const printChecklist = () => window.print();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
        <select value={visa} onChange={(e) => setVisa(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto">
          {Object.keys(CHECKLISTS).map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          <strong>{completedCount}</strong> of {items.length} items · {percent}% complete
        </div>
        <div className="flex gap-2">
          <button onClick={resetAll} className="text-sm text-gray-500 hover:text-brand-600">Reset</button>
          <button onClick={printChecklist} className="text-sm text-brand-600 hover:underline">🖨 Print</button>
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-brand-500 transition-all" style={{ width: `${percent}%` }} />
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => toggle(i)}>
            <input type="checkbox" checked={!!checked[key(i)]} onChange={() => toggle(i)}
                   className="mt-1 w-5 h-5 accent-brand-600" />
            <span className={checked[key(i)] ? 'line-through text-gray-400' : 'text-gray-800'}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
