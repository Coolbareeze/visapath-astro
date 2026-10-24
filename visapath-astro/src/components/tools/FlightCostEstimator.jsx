import { useState, useMemo } from 'react';

const ROUTES = {
  'KHI-DXB': { base: 220, name: 'Karachi → Dubai' },
  'LHE-DXB': { base: 230, name: 'Lahore → Dubai' },
  'ISB-DXB': { base: 250, name: 'Islamabad → Dubai' },
  'KHI-RUH': { base: 280, name: 'Karachi → Riyadh' },
  'LHE-JED': { base: 300, name: 'Lahore → Jeddah' },
  'KHI-LHR': { base: 580, name: 'Karachi → London' },
  'LHE-LHR': { base: 620, name: 'Lahore → London' },
  'ISB-LHR': { base: 640, name: 'Islamabad → London' },
  'KHI-JFK': { base: 950, name: 'Karachi → New York' },
  'LHE-JFK': { base: 980, name: 'Lahore → New York' },
  'KHI-YYZ': { base: 900, name: 'Karachi → Toronto' },
  'LHE-YYZ': { base: 940, name: 'Lahore → Toronto' },
  'KHI-CDG': { base: 650, name: 'Karachi → Paris' },
  'LHE-FRA': { base: 680, name: 'Lahore → Frankfurt' },
  'KHI-IST': { base: 380, name: 'Karachi → Istanbul' },
  'LHE-IST': { base: 400, name: 'Lahore → Istanbul' },
  'KHI-BKK': { base: 450, name: 'Karachi → Bangkok' },
  'LHE-KUL': { base: 480, name: 'Lahore → Kuala Lumpur' },
  'KHI-SIN': { base: 550, name: 'Karachi → Singapore' },
  'KHI-SYD': { base: 1200, name: 'Karachi → Sydney' },
};

const SEASON_FACTOR = {
  'Off-peak (Jan, Feb, Oct, Nov)': 0.85,
  'Shoulder (Mar, Apr, Sep)': 1.0,
  'Peak (May, Jun, Jul, Aug, Dec)': 1.4,
  'Hajj / Umrah peak (May-Jun, Dec)': 1.6,
};

const CLASS_FACTOR = {
  Economy: 1.0,
  'Premium Economy': 1.8,
  Business: 3.5,
  First: 6.0,
};

const WHEN_FACTOR = {
  'Last-minute (<2 weeks)': 1.5,
  'Short notice (2-4 weeks)': 1.2,
  'Normal (1-3 months)': 1.0,
  'Early (3-6 months)': 0.85,
};

export default function FlightCostEstimator() {
  const [route, setRoute] = useState('KHI-DXB');
  const [season, setSeason] = useState('Shoulder (Mar, Apr, Sep)');
  const [cls, setCls] = useState('Economy');
  const [when, setWhen] = useState('Normal (1-3 months)');

  const total = useMemo(() => {
    const r = ROUTES[route];
    const price = r.base * SEASON_FACTOR[season] * CLASS_FACTOR[cls] * WHEN_FACTOR[when];
    return Math.round(price);
  }, [route, season, cls, when]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
          <select value={route} onChange={(e) => setRoute(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.entries(ROUTES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
          <select value={season} onChange={(e) => setSeason(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(SEASON_FACTOR).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cabin class</label>
          <select value={cls} onChange={(e) => setCls(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(CLASS_FACTOR).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Booking window</label>
          <select value={when} onChange={(e) => setWhen(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(WHEN_FACTOR).map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-500 rounded-lg p-6 text-center">
        <div className="text-sm text-gray-600 mb-1">Estimated return ticket</div>
        <div className="text-4xl font-bold text-brand-600">${total.toLocaleString()}</div>
        <div className="text-xs text-gray-500 mt-2">
          ≈ PKR {(total * 278).toLocaleString()} · One-way ≈ 60-65% of return
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Estimates only. Actual fares depend on airline, availability, taxes, and promotions.
      </p>
    </div>
  );
}
