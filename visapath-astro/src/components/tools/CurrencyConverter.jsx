import { useState, useMemo, useEffect } from 'react';

const CURRENCIES = ['USD', 'PKR', 'GBP', 'EUR', 'AED', 'SAR', 'TRY', 'THB', 'MYR', 'CAD', 'AUD', 'SGD', 'QAR', 'OMR', 'CNY', 'JPY', 'INR'];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('GBP');
  const [to, setTo] = useState('PKR');
  const [rates, setRates] = useState(null);
  const [updated, setUpdated] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data.result === 'success') {
          setRates(data.rates);
          setUpdated(new Date(data.time_last_update_utc).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  const result = useMemo(() => {
    if (!rates) return 0;
    const inUSD = amount / rates[from];
    return inUSD * rates[to];
  }, [amount, from, to, rates]);

  const swap = () => { setFrom(to); setTo(from); };
  const fmt = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)}
               className="border border-gray-300 rounded-lg px-3 py-2 w-full text-lg" />
      </div>

      <div className="grid grid-cols-5 gap-2 items-end mb-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="text-center pb-2">
          <button onClick={swap} className="text-brand-600 text-xl" aria-label="Swap">⇄</button>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-500 rounded-lg p-6 text-center">
        {error ? (
          <div className="text-red-600 text-sm">Rate service unavailable. Please refresh.</div>
        ) : !rates ? (
          <div className="text-gray-500 text-sm">Loading live rates…</div>
        ) : (
          <>
            <div className="text-sm text-gray-600 mb-1">{fmt(amount)} {from} =</div>
            <div className="text-4xl font-bold text-brand-600">{fmt(result)} {to}</div>
            <div className="text-xs text-gray-500 mt-2">
              Live mid-market rate · Updated {updated} · Banks apply margins
            </div>
          </>
        )}
      </div>
    </div>
  );
}
