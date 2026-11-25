export const dashboardTimeZone = "Europe/Zurich";
const millisecondsPerDay = 24 * 60 * 60 * 1000;

export function getPracticeDay(date, timeZone = dashboardTimeZone) {
  const value = date instanceof Date ? date : new Date(date);
  if (!Number.isFinite(value.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(value);
  const part = (type) => Number(parts.find((entry) => entry.type === type).value);
  // Calendar-day arithmetic avoids 23/25-hour daylight-saving days.
  return Date.UTC(part("year"), part("month") - 1, part("day")) / millisecondsPerDay;
}

export function getDashboardStats(completions, now = new Date(), timeZone = dashboardTimeZone) {
  const uniqueCompletions = new Map();
  for (const completion of completions) {
    if (completion.id && completion.completedAt != null && getPracticeDay(completion.completedAt, timeZone) !== null) {
      uniqueCompletions.set(completion.id, completion);
    }
  }
  const activeDays = new Set(
    [...uniqueCompletions.values()].map((completion) => getPracticeDay(completion.completedAt, timeZone)),
  );
  const today = getPracticeDay(now, timeZone);
  let day = activeDays.has(today) ? today : today - 1;
  let streak = 0;
  while (activeDays.has(day)) {
    streak += 1;
    day -= 1;
  }
  return { completedExercises: uniqueCompletions.size, streak };
}
