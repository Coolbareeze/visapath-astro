import { useState } from 'react';
import { addMonths, parseDay } from '../../lib/travel-math.js';

export default function PassportValidityChecker() {
  const [expiry, setExpiry] = useState('');
  const [end, setEnd] = useState('');
  const [mode, setMode] = useState('Schengen');
  const [months, setMonths] = useState(6);
  const extraMonths = mode === 'Schengen' ? 3 : mode === 'UK' ? 0 : months;
  const required = addMonths(end, extraMonths);
  const valid = required && parseDay(expiry) !== null;
  const passes = valid && expiry >= required;
  const dateLabel = mode === 'Custom'
    ? 'Date to count from'
    : 'When will you leave this country?';
  const requiredDate = required
    ? new Date(required + 'T00:00:00Z').toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
      })
    : '';

  return (
    <div className="border rounded-lg p-6">
      <label className="block mb-4">
        Where are you travelling?
        <select className="block border rounded p-2 w-full" value={mode}
          onChange={e => { setMode(e.target.value); setEnd(''); }}>
          <option value="Schengen">Europe (Schengen countries)</option>
          <option value="UK">United Kingdom (visitor visa)</option>
          <option value="Custom">Another country</option>
        </select>
      </label>
      {mode === 'Schengen' && <p className="text-sm mb-4">For a Schengen visa, your passport must usually stay valid for at least 3 months after you leave. This includes countries such as France, Germany, Italy and Spain.</p>}
      {mode === 'UK' && <p className="text-sm mb-4">For a UK visit, your passport must stay valid for your whole stay.</p>}
      {mode === 'Custom' && (
        <>
          <p className="text-sm mb-4">First check the embassy or official visa website. Find out how many extra months your passport needs, and whether to count from your arrival date or the date you leave.</p>
          <label className="block mb-4">
            How many extra months are required?
            <input type="number" min="0" max="120" step="1" value={months}
              onChange={e => setMonths(Number(e.target.value))}
              className="block border rounded p-2 w-full" />
          </label>
        </>
      )}
      <label className="block mb-4">
        {dateLabel}
        <input type="date" value={end} onChange={e => setEnd(e.target.value)}
          className="block border rounded p-2 w-full" />
      </label>
      {mode === 'Custom'
        ? <p className="text-sm mb-4">Use the arrival or leaving date stated in the official rule.</p>
        : <p className="text-sm mb-4">Enter the date you leave your destination to return home or travel elsewhere.</p>}
      <label className="block mb-4">
        When does your passport expire?
        <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)}
          className="block border rounded p-2 w-full" />
      </label>
      <div className="bg-gray-50 rounded p-4" aria-live="polite">
        {valid ? (
          <>
            <p className="font-bold">{passes
              ? 'Your passport has enough time left for this rule.'
              : 'Your passport expires too soon for this rule.'}</p>
            <p>Your passport must expire on {requiredDate} or later.</p>
            {!passes && <p>Check passport renewal options before you travel.</p>}
          </>
        ) : <p>Fill in both dates to check your passport. For another country, enter the number of extra months required.</p>}
      </div>
      <p className="text-sm mt-4">This result checks your passport expiry date. Before travelling, also check your visa, spare passport pages, passport age rules and any countries you pass through. Confirm the full requirements with the embassy and airline.</p>
      <p className="text-sm mt-4">Official sources checked 14 November 2026: <a className="underline text-brand-600" href="https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en">Schengen</a> · <a className="underline text-brand-600" href="https://www.gov.uk/standard-visitor">UK visitor</a>.</p>
    </div>
  );
}
