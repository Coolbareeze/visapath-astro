import { useState, useMemo, useEffect } from 'react';

const RATES = {
  USD: 1,
  PKR: 278,
  GBP: 0.79,
  EUR: 0.92,
  AED: 3.67,
  SAR: 3.75,
  TRY: 34,
  THB: 36,
  MYR: 4.7,
  CAD: 1.37,
  AUD: 1.52,
  SGD: 1.35,
  QAR: 3.64,
  OMR: 0.38,
  CNY: 7.1,
  JPY: 149,
  INR: 83,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState('PKR');
  const [to, setTo] = useState('USD');

  const result = useMemo(() => {
    const inUSD = amount / RATES[from];
    return inUSD * RATES[to];
  }, [amount, from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

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
            {Object.keys(RATES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="text-center pb-2">
          <button onClick={swap} className="text-brand-600 text-xl" aria-label="Swap">⇄</button>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(RATES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-500 rounded-lg p-6 text-center">
        <div className="text-sm text-gray-600 mb-1">{fmt(amount)} {from} =</div>
        <div className="text-4xl font-bold text-brand-600">{fmt(result)} {to}</div>
        <div className="text-xs text-gray-500 mt-2">
          Approximate mid-market rate. Banks and exchange houses apply margins.
        </div>
      </div>
    </div>
  );
}
