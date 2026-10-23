import { useState, useMemo } from 'react';

export default function SchengenCalculator() {
  const [trips, setTrips] = useState([{ entry: '', exit: '' }]);
  const [checkDate, setCheckDate] = useState(new Date().toISOString().slice(0, 10));

  const update = (i, field, value) => {
    const next = [...trips];
    next[i][field] = value;
    setTrips(next);
  };

  const add = () => setTrips([...trips, { entry: '', exit: '' }]);
  const remove = (i) => setTrips(trips.filter((_, idx) => idx !== i));

  const result = useMemo(() => {
    const check = new Date(checkDate);
    if (isNaN(check)) return null;
    const windowStart = new Date(check);
    windowStart.setDate(windowStart.getDate() - 179);

    let used = 0;
    for (const t of trips) {
      if (!t.entry || !t.exit) continue;
      const entry = new Date(t.entry);
      const exit = new Date(t.exit);
      if (isNaN(entry) || isNaN(exit) || exit < entry) continue;
      const effStart = entry < windowStart ? windowStart : entry;
      const effEnd = exit > check ? check : exit;
      if (effEnd < effStart) continue;
      const days = Math.floor((effEnd - effStart) / 86400000) + 1;
      used += days;
    }
    return { used, remaining: Math.max(0, 90 - used) };
  }, [trips, checkDate]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Check date</label>
        <input
          type="date"
          value={checkDate}
          onChange={(e) => setCheckDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        <p className="text-xs text-gray-500 mt-1">Days used in the 180 days before this date</p>
      </div>

      <div className="space-y-3 mb-4">
        {trips.map((t, i) => (
          <div key={i} className="flex flex-wrap gap-2 items-center">
            <input
              type="date"
              value={t.entry}
              onChange={(e) => update(i, 'entry', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-[140px]"
            />
            <span className="text-gray-500">→</span>
            <input
              type="date"
              value={t.exit}
              onChange={(e) => update(i, 'exit', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-[140px]"
            />
            {trips.length > 1 && (
              <button onClick={() => remove(i)} className="text-red-600 px-2">✕</button>
            )}
          </div>
        ))}
      </div>

      <button onClick={add} className="text-brand-600 font-medium mb-6">+ Add trip</button>

      {result && (
        <div className="bg-brand-50 border border-brand-500 rounded-lg p-5 mt-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-600">{result.used}</div>
              <div className="text-sm text-gray-600">Days used</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{result.remaining}</div>
              <div className="text-sm text-gray-600">Days remaining</div>
            </div>
          </div>
          {result.used > 90 && (
            <p className="text-red-600 text-sm mt-4 text-center font-medium">
              ⚠ Overstay — exceeds 90 days in the 180-day window
            </p>
          )}
        </div>
      )}
    </div>
  );
}
