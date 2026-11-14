import { useState } from 'react';

const SOURCES = {
  "UK Visitor Visa": "https://www.gov.uk/standard-visitor",
  "US B1/B2 Visa": "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html",
  "Schengen Tourist Visa": "https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en",
  "Canada Visitor Visa": "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html",
  "UAE Tourist Visa": "https://u.ae/en/information-and-services/visa-and-emirates-id/visit-visas",
  "Turkey e-Visa": "https://www.evisa.gov.tr/",
  "Thailand Tourist Visa": "https://www.thaievisa.go.th/"
};
const CHECKLISTS = {
  "UK Visitor Visa": [
    "Check that the evidence supports a genuine temporary visit; follow the generated document list",
    "Read the official checklist for nationality, residence and application purpose",
    "Check passport details, validity and any blank-page requirement",
    "Complete the current application and save its confirmation",
    "Prepare the photo / identity evidence requested by the official service",
    "Explain travel purpose, itinerary, accommodation and payer where requested",
    "Prepare relevant financial and circumstance evidence in the required format",
    "Check translation, consent and family-document requirements for your case",
    "Confirm current fees and keep receipts",
    "Follow the identity / biometric appointment instructions actually issued",
    "Save the submitted file and monitor requests and deadlines"
  ],
  "US B1/B2 Visa": [
    "Keep DS-160 confirmation and interview instructions together; an invitation is not a substitute for qualifying",
    "Read the official checklist for nationality, residence and application purpose",
    "Check passport details, validity and any blank-page requirement",
    "Complete the current application and save its confirmation",
    "Prepare the photo / identity evidence requested by the official service",
    "Explain travel purpose, itinerary, accommodation and payer where requested",
    "Prepare relevant financial and circumstance evidence in the required format",
    "Check translation, consent and family-document requirements for your case",
    "Confirm current fees and keep receipts",
    "Follow the identity / biometric appointment instructions actually issued",
    "Save the submitted file and monitor requests and deadlines"
  ],
  "Schengen Tourist Visa": [
    "Confirm the responsible consulate from your genuine itinerary and check insurance requirements",
    "Read the official checklist for nationality, residence and application purpose",
    "Check passport details, validity and any blank-page requirement",
    "Complete the current application and save its confirmation",
    "Prepare the photo / identity evidence requested by the official service",
    "Explain travel purpose, itinerary, accommodation and payer where requested",
    "Prepare relevant financial and circumstance evidence in the required format",
    "Check translation, consent and family-document requirements for your case",
    "Confirm current fees and keep receipts",
    "Follow the identity / biometric appointment instructions actually issued",
    "Save the submitted file and monitor requests and deadlines"
  ],
  "Canada Visitor Visa": [
    "Use the document list for the application route supplied by IRCC; follow any biometric request",
    "Read the official checklist for nationality, residence and application purpose",
    "Check passport details, validity and any blank-page requirement",
    "Complete the current application and save its confirmation",
    "Prepare the photo / identity evidence requested by the official service",
    "Explain travel purpose, itinerary, accommodation and payer where requested",
    "Prepare relevant financial and circumstance evidence in the required format",
    "Check translation, consent and family-document requirements for your case",
    "Confirm current fees and keep receipts",
    "Follow the identity / biometric appointment instructions actually issued",
    "Save the submitted file and monitor requests and deadlines"
  ],
  "UAE Tourist Visa": [
    "Identify the sponsor / submitting channel and request an itemised fee and service quote",
    "Read the official checklist for nationality, residence and application purpose",
    "Check passport details, validity and any blank-page requirement",
    "Complete the current application and save its confirmation",
    "Prepare the photo / identity evidence requested by the official service",
    "Explain travel purpose, itinerary, accommodation and payer where requested",
    "Prepare relevant financial and circumstance evidence in the required format",
    "Check translation, consent and family-document requirements for your case",
    "Confirm current fees and keep receipts",
    "Follow the identity / biometric appointment instructions actually issued",
    "Save the submitted file and monitor requests and deadlines"
  ],
  "Turkey e-Visa": [
    "Read every supporting-visa/residence and other eligibility condition before payment",
    "Read the official checklist for nationality, residence and application purpose",
    "Check passport details, validity and any blank-page requirement",
    "Complete the current application and save its confirmation",
    "Prepare the photo / identity evidence requested by the official service",
    "Explain travel purpose, itinerary, accommodation and payer where requested",
    "Prepare relevant financial and circumstance evidence in the required format",
    "Check translation, consent and family-document requirements for your case",
    "Confirm current fees and keep receipts",
    "Follow the identity / biometric appointment instructions actually issued",
    "Save the submitted file and monitor requests and deadlines"
  ],
  "Thailand Tourist Visa": [
    "Follow the mission identified by the official portal for your location and residence",
    "Read the official checklist for nationality, residence and application purpose",
    "Check passport details, validity and any blank-page requirement",
    "Complete the current application and save its confirmation",
    "Prepare the photo / identity evidence requested by the official service",
    "Explain travel purpose, itinerary, accommodation and payer where requested",
    "Prepare relevant financial and circumstance evidence in the required format",
    "Check translation, consent and family-document requirements for your case",
    "Confirm current fees and keep receipts",
    "Follow the identity / biometric appointment instructions actually issued",
    "Save the submitted file and monitor requests and deadlines"
  ]
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
      <p className="text-sm mb-5">Preparation checklist, not an official document list. Tick marks track your work only; 100% does not mean eligibility or approval. <a className="underline text-brand-600" href={SOURCES[visa]}>Open the official route checklist</a>.</p>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
        <select aria-label="Visa Type" value={visa} onChange={(e) => setVisa(e.target.value)}
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
              >
            <label className="flex gap-3 cursor-pointer"><input type="checkbox" checked={!!checked[key(i)]} onChange={() => toggle(i)}
                   className="mt-1 w-5 h-5 accent-brand-600" />
            <span className={checked[key(i)] ? 'line-through text-gray-400' : 'text-gray-800'}>
              {item}
            </span></label>
          </li>
        ))}
      </ul>
    </div>
  );
}
