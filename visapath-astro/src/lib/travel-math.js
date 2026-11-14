const DAY = 86400000;
export function parseDay(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time / DAY : null;
}
export function schengenDays(trips, checkDate) {
  const check = parseDay(checkDate);
  if (check === null) return { error: 'Enter a valid check date.' };
  const days = new Set();
  let complete = 0;
  for (const [index, trip] of trips.entries()) {
    if (!trip.entry && !trip.exit) continue;
    const start = parseDay(trip.entry), end = parseDay(trip.exit);
    if (start === null || end === null) return { error: `Trip ${index + 1}: enter both valid dates.` };
    if (end < start) return { error: `Trip ${index + 1}: exit must be on or after entry.` };
    complete++;
    for (let day = Math.max(start, check - 179); day <= Math.min(end, check); day++) days.add(day);
  }
  if (!complete) return null;
  return { used: days.size, remaining: Math.max(0, 90 - days.size) };
}
export function convertFee(amount, source, target, rates) {
  if (!Number.isFinite(amount) || amount < 0) return null;
  if (source === target) return amount;
  if (!rates || !Number.isFinite(rates[source]) || !Number.isFinite(rates[target]) || rates[source] <= 0 || rates[target] <= 0) return null;
  return amount / rates[source] * rates[target];
}
export function addMonths(value, months) {
  if (parseDay(value) === null || !Number.isInteger(months) || months < 0 || months > 120) return null;
  const date = new Date(`${value}T00:00:00Z`);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, last));
  return date.toISOString().slice(0, 10);
}
export function budgetTotal(rows, people) {
  if (!Number.isInteger(people) || people < 1) return null;
  if (rows.some(row => row.value === '' || !Number.isFinite(Number(row.value)) || Number(row.value) < 0)) return null;
  const total = rows.reduce((sum, row) => sum + Number(row.value) * (row.perPerson ? people : 1), 0);
  return Number.isFinite(total) ? { total, perPerson: total / people } : null;
}
export function stayDates(entryDate, allowed, todayDate, plannedExit = '') {
  const entry = parseDay(entryDate), today = parseDay(todayDate);
  if (entry === null || today === null || !Number.isInteger(allowed) || allowed < 1 || allowed > 36500) return { error: 'Enter a valid entry date and positive whole-number day allowance.' };
  const exit = plannedExit ? parseDay(plannedExit) : null;
  if (plannedExit && (exit === null || exit < entry)) return { error: 'Planned exit must be a valid date on or after entry.' };
  const used = Math.max(0, today - entry + 1);
  return { mustLeave: new Date((entry + allowed - 1) * DAY).toISOString().slice(0, 10), daysUsed: used, daysLeft: Math.max(0, allowed - used), overstayDays: exit === null ? 0 : Math.max(0, exit - entry + 1 - allowed) };
}
