import { useState, useMemo } from 'react';

export default function VisaExpiryCalculator() {
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 10));
  const [stayAllowedDays, setStayAllowedDays] = useState(90);
  const [plannedExit, setPlannedExit] = useState('');

  const result = useMemo(() => {
    if (!entryDate) return null;
    const entry = new Date(entryDate);
    if (isNaN(entry)) return null;

    const mustLeave = new Date(entry);
    mustLeave.setDate(mustLeave.getDate() + stayAllowedDays - 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysUsed = Math.floor((today - entry) / 86400000) + 1;
    const daysLeft = Math.max(0, stayAllowedDays - daysUsed);

    let overstayDays = 0;
    if (plannedExit) {
      const exit = new Date(plannedExit);
      if (!isNaN(exit)) {
        const stayDays = Math.floor((exit - entry) / 86400000) + 1;
        if (stayDays > stayAllowedDays) overstayDays = stayDays - stayAllowedDays;
      }
    }

    return {
      mustLeave: mustLeave.toISOString().slice(0, 10),
      daysUsed: Math.max(0, daysUsed),
      daysLeft,
      overstayDays,
      stayAllowedDays,
    };
  }, [entryDate, stayAllowedDays, plannedExit]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Entry Date</label>
          <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Days Allowed</label>
          <input type="number" value={stayAllowedDays} min="1" onChange={(e) => setStayAllowedDays(Number(e.target.value) || 0)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
          <p className="text-xs text-gray-500 mt-1">E.g., 30, 60, 90, 180</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Planned Exit (optional)</label>
          <input type="date" value={plannedExit} onChange={(e) => setPlannedExit(e.target.value)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="bg-brand-50 border border-brand-500 rounded-lg p-5">
            <div className="text-sm text-gray-600 mb-1">You must leave by</div>
            <div className="text-2xl font-bold text-brand-600">{result.mustLeave}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gray-800">{result.daysUsed}</div>
              <div className="text-sm text-gray-600">Days used</div>
            </div>
            <div className="bg-green-50 border border-green-500 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{result.daysLeft}</div>
              <div className="text-sm text-gray-600">Days remaining</div>
            </div>
          </div>

          {result.overstayDays > 0 && (
            <div className="bg-red-50 border border-red-500 rounded-lg p-4">
              <p className="text-red-700 font-medium">
                ⚠ Planned exit exceeds allowed stay by {result.overstayDays} day{result.overstayDays > 1 ? 's' : ''}.
              </p>
              <p className="text-red-600 text-sm mt-1">
                Overstay can result in fines, deportation, and future visa denials. Adjust your travel plans or apply for an extension.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
