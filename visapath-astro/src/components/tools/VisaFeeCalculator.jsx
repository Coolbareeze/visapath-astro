import { useState, useEffect } from 'react';
import { visaFees, checked, otherFeeSources } from '../../data/visa-fees.js';
import { convertFee } from '../../lib/travel-math.js';
export default function VisaFeeCalculator() {
  const [selected, setSelected] = useState(0);
  const [currency, setCurrency] = useState('PKR');
  const [rates, setRates] = useState(null);
  const [rateDate, setRateDate] = useState('');
  const [rateError, setRateError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error('Rates unavailable'); return r.json(); })
      .then(data => {
        const stamp = Number(data.time_last_update_unix) * 1000;
        if (data.result !== 'success' || !Number.isFinite(stamp) || stamp > Date.now() + 3600000 || Date.now() - stamp > 72 * 3600000) throw new Error('Rates are stale');
        setRates(data.rates);
        setRateDate(new Date(stamp).toLocaleDateString('en-GB', { timeZone: 'UTC' }));
      }).catch(error => { if (error.name !== 'AbortError') setRateError(true); });
    return () => controller.abort();
  }, []);
  const fee = visaFees[selected];
  const converted = convertFee(fee.amount, fee.currency, currency, rates);
  const format = (value, code) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: code }).format(value);
  return <div className="bg-white border border-gray-200 rounded-lg p-6">
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <label className="text-sm font-medium">Destination and visa
        <select className="block border rounded-lg px-3 py-2 w-full mt-2" value={selected} onChange={e => setSelected(Number(e.target.value))}>
          {visaFees.map((item, index) => <option key={index} value={index}>{item.country} — {item.type}</option>)}
        </select>
      </label>
      <label className="text-sm font-medium">Estimate in
        <select className="block border rounded-lg px-3 py-2 w-full mt-2" value={currency} onChange={e => setCurrency(e.target.value)}>
          {['PKR', 'GBP', 'USD', 'CAD', 'EUR'].map(code => <option key={code}>{code}</option>)}
        </select>
      </label>
    </div>
    <div className="bg-brand-50 rounded-lg p-6" aria-live="polite">
      <p className="font-semibold">Base government fee: {format(fee.amount, fee.currency)}</p>
      {converted !== null ? <p className="text-2xl font-bold mt-2">{currency === fee.currency ? 'Original amount: ' : 'Planning estimate: '}{format(converted, currency)}</p> : <p className="mt-2">{rateError ? 'Conversion unavailable. Use the original fee above; no fallback rate is substituted.' : 'Loading exchange rates…'}</p>}
      <p className="text-sm mt-3">{fee.note}</p>
      <p className="text-sm mt-3">Fee checked {checked}. <a className="underline text-brand-600" href={fee.source}>Verify with the issuing authority</a>.</p>
      {rateDate && currency !== fee.currency && <p className="text-xs mt-3">Reference rates dated {rateDate} (UTC) from <a href="https://www.exchangerate-api.com/" className="underline">ExchangeRate-API</a>. Bank, card and embassy payment rates differ.</p>}
    </div>
    <p className="text-sm mt-4">For other destinations and visa categories, get a quote from the official service. We do not substitute unverified amounts.</p>
    <ul className="list-disc pl-5 text-sm mt-3">{otherFeeSources.map(([name, href]) => <li key={name}><a className="underline text-brand-600" href={href}>{name} official fee service</a></li>)}</ul>
  </div>;
}
