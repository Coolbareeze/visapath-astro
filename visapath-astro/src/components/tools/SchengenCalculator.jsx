import { useState, useMemo } from 'react';
import { schengenDays } from '../../lib/travel-math.js';

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

  const result = useMemo(() => schengenDays(trips, checkDate), [trips, checkDate]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Check date</label>
        <input
          aria-label="Check date"
          type="date"
          value={checkDate}
          onChange={(e) => setCheckDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        <p className="text-xs text-gray-500 mt-1">Includes the check date and preceding 179 days; overlapping visits count once.</p>
      </div>

      <div className="space-y-3 mb-4">
        {trips.map((t, i) => (
          <div key={i} className="flex flex-wrap gap-2 items-center">
            <input
              aria-label={`Trip ${i + 1} entry date`}
              type="date"
              value={t.entry}
              onChange={(e) => update(i, 'entry', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-[140px]"
            />
            <span className="text-gray-500">→</span>
            <input
              aria-label={`Trip ${i + 1} exit date`}
              type="date"
              value={t.exit}
              onChange={(e) => update(i, 'exit', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-[140px]"
            />
            {trips.length > 1 && (
              <button onClick={() => remove(i)} aria-label={`Remove trip ${i + 1}`} className="text-red-600 px-2">✕</button>
            )}
          </div>
        ))}
      </div>

      <button onClick={add} className="text-brand-600 font-medium mb-6">+ Add trip</button>

      {result?.error && <p role="alert" className="text-red-700 mt-4">{result.error}</p>}
      {result && !result.error && (
        <div className="bg-brand-50 border border-brand-500 rounded-lg p-5 mt-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-600">{result.used}</div>
              <div className="text-sm text-gray-600">Days used</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{result.remaining}</div>
              <div className="text-sm text-gray-600">Unused days on check date</div>
            </div>
          </div>
          {result.used > 90 && (
            <p className="text-red-600 text-sm mt-4 text-center font-medium">
              The entered dates exceed 90 days in this window. Check your visa conditions and official guidance.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
