import { useState } from 'react';
const entries = [
  ['UK — visit, study, work and family', 'Check the current outside-UK table for your exact route. Separate appointment availability, decision time and passport return. Faster services depend on the application route and availability.', 'https://www.gov.uk/guidance/visa-processing-times-applications-outside-the-uk'],
  ['USA — nonimmigrant visas', 'Look up the consular post and visa category. Interview wait estimates are not a promise of a slot or a visa decision. Administrative processing is additional.', 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html'],
  ['Canada — temporary residence', 'Use IRCC’s live tool with your application category and country. Do not use an old Pakistan-wide estimate. The Student Direct Stream ended on 8 November 2024.', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html'],
  ['Schengen — short stay', 'The European Commission gives a normal decision time of 15 days, which may extend to 45 days. Appointment waits and passport return add time. Premium application-centre services do not guarantee a faster decision.', 'https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en'],
  ['Australia — visitor and other visas', 'Use the official processing guide for the visa subclass and stream. Its historical figures do not guarantee the time for a new application.', 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times'],
  ['UAE — visit visas', 'Confirm the processing channel with the relevant immigration authority or authorised sponsor. No universal urgent timeline is quoted here.', 'https://u.ae/en/information-and-services/visa-and-emirates-id/visit-visas'],
  ['Türkiye — e-Visa or sticker visa', 'First establish whether you qualify for an e-Visa. Check the official portal or responsible mission for your route; a quick online application is not a guarantee of entry.', 'https://www.evisa.gov.tr/'],
  ['Thailand — e-Visa', 'Check the mission responsible for your place of residence and the application portal. Additional evidence can change the timeline.', 'https://www.thaievisa.go.th/'],
  ['Malaysia — eVISA', 'Use Immigration’s portal to check the current service. Requests for extra documents or an interview can add time.', 'https://malaysiavisa.imi.gov.my/'],
  ['Saudi Arabia — visit / Umrah', 'Use the official visa service for your nationality and purpose, and confirm any seasonal restrictions. A package purchase is not visa approval.', 'https://ksavisa.sa/'],
];
export default function ProcessingTimeLookup() {
  const [selected, setSelected] = useState(0);
  const [name, note, href] = entries[selected];
  return <div className="border rounded-lg p-6">
    <label className="block font-medium">Destination and route
      <select className="block border rounded-lg px-3 py-2 w-full mt-2" value={selected} onChange={e => setSelected(Number(e.target.value))}>
        {entries.map(([label], i) => <option key={label} value={i}>{label}</option>)}
      </select>
    </label>
    <div className="bg-gray-50 rounded-lg p-5 mt-5" aria-live="polite"><h2 className="font-bold text-lg">{name}</h2><p className="my-3">{note}</p><a className="text-brand-600 underline" href={href}>Open the official processing information</a></div>
    <p className="text-sm text-gray-600 mt-4">Official links reviewed 14 November 2026. Check the live source each time you plan an application. VisaPath does not predict an individual decision date.</p>
  </div>;
}
