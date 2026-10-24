import { useState, useMemo } from 'react';

const RULES = {
  'Schengen Area (EU)': { months: 3, note: 'Must be valid for at least 3 months beyond planned departure from Schengen.' },
  'United Kingdom': { months: 0, note: 'Must be valid for the full duration of your intended stay.' },
  'United States': { months: 6, note: 'Six-month rule applies unless Pakistan has a specific agreement (it does not).' },
  'Canada': { months: 0, note: 'Must be valid for the full duration of stay.' },
  'UAE': { months: 6, note: '6-month validity required from arrival date.' },
  'Saudi Arabia': { months: 6, note: '6-month validity required from arrival date.' },
  'Turkey': { months: 6, note: '6-month validity required from arrival date for e-Visa.' },
  'Thailand': { months: 6, note: '6-month validity required from arrival date.' },
  'Malaysia': { months: 6, note: '6-month validity required from arrival date.' },
  'Australia': { months: 0, note: 'Must be valid for the duration of visa.' },
  'China': { months: 6, note: '6-month validity plus 2 blank visa pages.' },
  'Japan': { months: 0, note: 'Must cover entire stay. Pakistani passport holders need a visa.' },
  'Singapore': { months: 6, note: '6-month validity required.' },
  'Qatar': { months: 6, note: '6-month validity required.' },
};

export default function PassportValidityChecker() {
  const [expiry, setExpiry] = useState('');
  const [travelDate, setTravelDate] = useState(new Date().toISOString().slice(0, 10));
  const [destination, setDestination] = useState('Schengen Area (EU)');

  const result = useMemo(() => {
    if (!expiry || !travelDate) return null;
    const exp = new Date(expiry);
    const travel = new Date(travelDate);
    if (isNaN(exp) || isNaN(travel)) return null;

    const rule = RULES[destination];
    const required = new Date(travel);
    required.setMonth(required.getMonth() + rule.months);

    const diffMs = exp - required;
    const diffDays = Math.floor(diffMs / 86400000);

    const totalMonthsLeft = Math.floor((exp - travel) / (86400000 * 30.44));

    return {
      ok: exp >= required,
      monthsLeft: totalMonthsLeft,
      requiredDate: required.toISOString().slice(0, 10),
      shortfallDays: Math.abs(diffDays),
      rule: rule.note,
      requiredMonths: rule.months,
    };
  }, [expiry, travelDate, destination]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passport Expiry Date</label>
          <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
          <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full">
            {Object.keys(RULES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {result && (
        <div className={`rounded-lg p-5 border ${result.ok ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
          <div className="text-lg font-bold mb-2">
            {result.ok ? '✓ Passport valid for travel' : '✗ Passport does not meet requirements'}
          </div>
          <p className="text-sm text-gray-700 mb-3">
            <strong>Rule:</strong> {result.rule}
          </p>
          <p className="text-sm text-gray-700">
            Your passport expires {result.monthsLeft} months after your travel date.
            {result.requiredMonths > 0 && ` Requirement: at least ${result.requiredMonths} months beyond travel.`}
          </p>
          {!result.ok && (
            <p className="text-sm text-red-700 mt-3 font-medium">
              You need to renew your passport before this trip. Required valid-until date: {result.requiredDate}
            </p>
          )}
        </div>
      )}

      {!result && (
        <p className="text-center text-gray-500 text-sm">Fill in all fields to check your passport validity.</p>
      )}
    </div>
  );
}
