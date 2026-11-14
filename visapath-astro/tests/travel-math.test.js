import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDay, schengenDays, convertFee, addMonths, budgetTotal, stayDates } from '../src/lib/travel-math.js';

test('rejects impossible dates rather than normalising them', () => {
  assert.equal(parseDay('2026-02-30'), null);
  assert.notEqual(parseDay('2024-02-29'), null);
});
test('Schengen counts inclusive, overlapping and duplicate visits once', () => {
  const trips = [{ entry: '2026-06-01', exit: '2026-06-10' }, { entry: '2026-06-05', exit: '2026-06-15' }, { entry: '2026-06-01', exit: '2026-06-10' }];
  assert.deepEqual(schengenDays(trips, '2026-06-15'), { used: 15, remaining: 75 });
});
test('window is exactly 180 days and includes check date', () => {
  assert.equal(schengenDays([{ entry: '2026-01-01', exit: '2026-12-31' }], '2026-12-31').used, 180);
  assert.equal(schengenDays([{ entry: '2026-07-04', exit: '2026-07-05' }], '2026-12-31').used, 1);
});
test('future days excluded and same-day visits count one', () => {
  assert.equal(schengenDays([{ entry: '2026-12-31', exit: '2027-02-01' }], '2026-12-31').used, 1);
  assert.equal(schengenDays([{ entry: '2027-01-01', exit: '2027-01-02' }], '2026-12-31').used, 0);
});
test('no misleading result for incomplete or reversed trips', () => {
  assert(schengenDays([{ entry: '2026-01-02', exit: '' }], '2026-01-03').error);
  assert(schengenDays([{ entry: '2026-01-02', exit: '2026-01-01' }], '2026-01-03').error);
  assert.equal(schengenDays([{ entry: '', exit: '' }], '2026-01-03'), null);
});
test('uses UTC day numbers across DST and leap days', () => {
  assert.equal(schengenDays([{ entry: '2026-03-28', exit: '2026-03-30' }], '2026-03-30').used, 3);
  assert.equal(schengenDays([{ entry: '2024-02-28', exit: '2024-03-01' }], '2024-03-01').used, 3);
});
test('currency conversion respects original GBP and CAD denominations', () => {
  const rates = { USD: 1, GBP: .8, CAD: 1.4, PKR: 280 };
  assert.equal(convertFee(135, 'GBP', 'PKR', rates), 47250);
  assert.equal(convertFee(100, 'CAD', 'PKR', rates), 20000);
  assert.equal(convertFee(0, 'CAD', 'PKR', rates), 0);
});
test('no fallback or invalid conversion; original currency remains usable', () => {
  assert.equal(convertFee(100, 'CAD', 'PKR', null), null);
  assert.equal(convertFee(100, 'CAD', 'PKR', { CAD: 0, PKR: 280 }), null);
  assert.equal(convertFee(100, 'CAD', 'CAD', null), 100);
  assert.equal(convertFee(-1, 'USD', 'USD', null), null);
});
test('calendar buffers clamp month ends and respect leap years', () => {
  assert.equal(addMonths('2026-01-31', 1), '2026-02-28');
  assert.equal(addMonths('2023-11-30', 3), '2024-02-29');
  assert.equal(addMonths('2026-11-30', 0), '2026-11-30');
  assert.equal(addMonths('2026-01-01', -1), null);
});
test('budgets multiply per-person lines and add shared costs once', () => {
  assert.deepEqual(budgetTotal([{ value: '100', perPerson: true }, { value: '50', perPerson: false }], 2), { total: 250, perPerson: 125 });
  assert.equal(budgetTotal([{ value: '', perPerson: true }], 2), null);
  assert.equal(budgetTotal([{ value: '-1', perPerson: true }], 2), null);
  assert.equal(budgetTotal([{ value: '1', perPerson: true }], 0), null);
});
test('day allowance is inclusive, with no pre-arrival days used', () => {
  const result = stayDates('2026-01-01', 1, '2025-12-31', '2026-01-02');
  assert.equal(result.mustLeave, '2026-01-01');
  assert.equal(result.daysLeft, 1);
  assert.equal(result.daysUsed, 0);
  assert.equal(result.overstayDays, 1);
});
test('stay planner validates allowance and exit', () => {
  assert(stayDates('2026-01-01', 0, '2026-01-01').error);
  assert(stayDates('2026-01-01', 1.5, '2026-01-01').error);
  assert(stayDates('2026-01-01', 30, '2026-01-01', '2025-12-31').error);
});
