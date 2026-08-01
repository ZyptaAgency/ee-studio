export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

export type MeetingType = "call" | "in_person";

export const MEETING_TYPE_LABELS: Record<MeetingType, { fr: string; en: string }> = {
  call: { fr: "Appel", en: "Call" },
  in_person: { fr: "Présentiel", en: "In person" },
};

export function isWeekendISO(iso: string): boolean {
  if (!iso) return false;
  const d = new Date(`${iso}T00:00:00`);
  const day = d.getDay();
  return day === 0 || day === 6;
}

/**
 * Returns ISO date strings (yyyy-mm-dd) for the next `count` days starting tomorrow.
 * When `allowWeekend` is false, Saturdays and Sundays are excluded.
 */
export function getAvailableDates(allowWeekend: boolean, count = 60): string[] {
  const out: string[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 1; i <= count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const day = d.getDay();
    if (!allowWeekend && (day === 0 || day === 6)) continue;
    out.push(d.toISOString().split("T")[0]);
  }
  return out;
}
