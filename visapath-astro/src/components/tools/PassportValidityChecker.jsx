import { useState } from 'react';
import { addMonths, parseDay } from '../../lib/travel-math.js';
export default function PassportValidityChecker() {
  const [expiry, setExpiry]=useState('');
  const [end, setEnd]=useState('');
  const [mode, setMode]=useState('Schengen');
  const [months, setMonths]=useState(6);
  const buffer=mode==='Schengen'?3:mode==='UK'?0:months;
  const required=addMonths(end,buffer);
  const valid=required && parseDay(expiry)!==null;
  const passes=valid && expiry>=required;
  return <div className="border rounded-lg p-6">
    <label className="block mb-4">Rule to compare<select className="block border rounded p-2 w-full" value={mode} onChange={e=>{setMode(e.target.value);setEnd('');}}><option value="Schengen">Schengen — three months after planned exit</option><option value="UK">UK visitor — covers the full stay</option><option value="Custom">Other destination — enter the verified buffer</option></select></label>
    {mode==='Custom' && <><p className="text-sm mb-4">Confirm the required buffer and its anchor date with your destination’s official authority. This mode does not supply a country rule.</p><label className="block mb-4">Verified buffer in calendar months<input type="number" min="0" max="120" step="1" value={months} onChange={e=>setMonths(Number(e.target.value))} className="block border rounded p-2 w-full" /></label></>}
    <label className="block mb-4">{mode==='Custom'?'Official rule’s anchor date (arrival or departure, as specified)':'Planned departure from destination'}<input aria-label="Rule anchor date" type="date" value={end} onChange={e=>setEnd(e.target.value)} className="block border rounded p-2 w-full" /></label>
    <label className="block mb-4">Passport expiry date<input aria-label="Passport expiry date" type="date" value={expiry} onChange={e=>setExpiry(e.target.value)} className="block border rounded p-2 w-full" /></label>
    <div className="bg-gray-50 rounded p-4" aria-live="polite">{valid ? <><p className="font-bold">{passes?'Expiry meets this date comparison.':'Expiry falls short of this date comparison.'}</p><p>Required valid-until date: {required}.</p></> : <p>Enter valid dates and a whole-number buffer to compare.</p>}</div>
    <p className="text-sm mt-4">This checks expiry only. It does not confirm visa eligibility, passport issue-date rules, blank pages, transit requirements or boarding/admission.</p>
    <p className="text-sm mt-4">Sources checked 14 November 2026: <a className="underline text-brand-600" href="https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en">Schengen</a> · <a className="underline text-brand-600" href="https://www.gov.uk/standard-visitor">UK visitor</a>.</p>
  </div>;
}
