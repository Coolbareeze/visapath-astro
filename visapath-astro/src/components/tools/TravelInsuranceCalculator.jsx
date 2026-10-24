import { useState, useMemo } from 'react';

const REGION_FACTOR = {
  'Schengen Europe': 1.0,
  'UK': 1.1,
  'USA / Canada': 1.8,
  'Asia (Thailand, Malaysia, Singapore)': 0.7,
  'Middle East (UAE, Saudi, Qatar)': 0.6,
  'Turkey': 0.7,
  'Worldwide including US': 1.9,
  'Worldwide excluding US': 1.0,
};

const COVERAGE_FACTOR = {
  '€30,000 (Schengen minimum)': 1.0,
  '$100,000': 1.4,
  '$250,000': 1.9,
  '$500,000+': 2.5,
};

export default function TravelInsuranceCalculator() {
  const [days, setDays] = useState(14);
  const [age, setAge] = useState(30);
  const [region, setRegion] = useState('Schengen Europe');
  const [coverage, setCoverage] = useState('€30,000 (Schengen minimum)');

  const result = useMemo(() => {
    let base = 2.5 * days;
    const ageFactor = age < 18 ? 0.6 : age < 35 ? 1.0 : age < 55 ? 1.3 : age < 70 ? 2.0 : 3.5;
    const total = base * ageFactor * REGION_FACTOR[region] * COVERAGE_FACTOR[coverage];
    return Math.round(total);
  }, [days, age, region, coverage]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trip length (days)</label>
          <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value) || 0)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Traveler age</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || 0)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" min="0" max="99" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination region</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(REGION_FACTOR).map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coverage amount</label>
          <select value={coverage} onChange={(e) => setCoverage(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(COVERAGE_FACTOR).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-500 rounded-lg p-6 text-center">
        <div className="text-sm text-gray-600 mb-1">Estimated Premium</div>
        <div className="text-4xl font-bold text-brand-600">${result}</div>
        <div className="text-xs text-gray-500 mt-2">
          ≈ PKR {(result * 278).toLocaleString()} · Actual quotes vary by provider
        </div>
      </div>
    </div>
  );
}
