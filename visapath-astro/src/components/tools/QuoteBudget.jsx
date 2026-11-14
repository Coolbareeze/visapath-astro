import { useState } from 'react';
import { budgetTotal } from '../../lib/travel-math.js';
const groups = {
  flight: ['Return airfare per traveller', 'Baggage per traveller', 'Seats / meals per traveller', 'Booking charges per traveller', 'Shared airport transfers'],
  insurance: ['Policy premium per traveller', 'Optional cover per traveller', 'Policy / service charge per traveller'],
  umrah: ['Return flights per traveller', 'Visa / service quote per traveller', 'Insurance per traveller', 'Shared Makkah accommodation total', 'Shared Madinah accommodation total', 'Shared transfers total', 'Meals / other costs per traveller', 'Contingency per traveller'],
};
export default function QuoteBudget({ kind }) {
  const [people, setPeople] = useState(1);
  const [currency, setCurrency] = useState('PKR');
  const [rows, setRows] = useState(groups[kind].map(label => ({ label, value: '', perPerson: !label.startsWith('Shared') })));
  const result = budgetTotal(rows, people);
  const money = n => new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(n);
  return <div className="border rounded-lg p-6">
    <p className="mb-4">Enter current written quotes in one currency. No live fares, insurer premiums or government fees are supplied by this budget tool. Enter 0 for a cost that does not apply.</p>
    <div className="grid sm:grid-cols-2 gap-4 mb-4">
      <label>Travellers<input aria-label="Travellers" type="number" min="1" step="1" value={people} onChange={e=>setPeople(Number(e.target.value))} className="block border rounded p-2 w-full" /></label>
      <label>Quote currency<select className="block border rounded p-2 w-full" value={currency} onChange={e=>{ setCurrency(e.target.value); setRows(rows.map(row=>({...row,value:''}))); }}>{['PKR','USD','SAR','GBP','EUR'].map(c=><option key={c}>{c}</option>)}</select></label>
    </div>
    <p className="text-xs mb-4">Changing currency clears amounts; this planner does not convert them.</p>
    <div className="space-y-3">{rows.map((row,i)=><label key={row.label} className="block text-sm">{row.label}<input type="number" min="0" step="0.01" value={row.value} onChange={e=>setRows(rows.map((r,j)=>i===j?{...r,value:e.target.value}:r))} className="block border rounded p-2 w-full" /></label>)}</div>
    <div className="bg-brand-50 rounded p-5 mt-5" aria-live="polite">{result ? <><p className="text-xl font-bold">Total: {money(result.total)}</p><p>Per traveller: {money(result.perPerson)}</p></> : <p>Enter a positive whole-number traveller count and all non-negative cost amounts to calculate.</p>}</div>
  </div>;
}
