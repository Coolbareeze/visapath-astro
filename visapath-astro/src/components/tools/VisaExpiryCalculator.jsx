import { useState, useMemo } from 'react';
import { stayDates } from '../../lib/travel-math.js';

export default function VisaExpiryCalculator() {
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 10));
  const [stayAllowedDays, setStayAllowedDays] = useState(90);
  const [plannedExit, setPlannedExit] = useState('');

  const result = useMemo(() => {
    const now = new Date();
    const today = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
    return stayDates(entryDate, stayAllowedDays, today, plannedExit);
  }, [entryDate, stayAllowedDays, plannedExit]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Entry Date</label>
          <input aria-label="Entry Date" type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Days Allowed</label>
          <input aria-label="Days Allowed" type="number" value={stayAllowedDays} min="1" onChange={(e) => setStayAllowedDays(Number(e.target.value) || 0)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
          <p className="text-xs text-gray-500 mt-1">Use a verified day allowance, not a period stated in calendar months.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Planned Exit (optional)</label>
          <input aria-label="Planned Exit" type="date" value={plannedExit} onChange={(e) => setPlannedExit(e.target.value)}
                 className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
        </div>
      </div>

      {result?.error && <p role="alert" className="text-red-700">{result.error}</p>}
      {result && !result.error && (
        <div className="space-y-3">
          <div className="bg-brand-50 border border-brand-500 rounded-lg p-5">
            <div className="text-sm text-gray-600 mb-1">Calculated last day (entry counted as day 1)</div>
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
