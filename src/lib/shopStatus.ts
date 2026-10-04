import type { ShopInfo } from '../data/types';

export type ShopState = "open" | "closingSoon" | "closedToday" | "closedTomorrow";

export interface ShopStatusResult {
  state: ShopState;
  closeLabel: string;
  openLabel: string;
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [h, m] = timeStr.split(':').map(Number);
  return { hours: h, minutes: m };
}

function formatTimeAMPM(timeStr: string): string {
  const { hours, minutes } = parseTime(timeStr);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  const m = minutes.toString().padStart(2, '0');
  return `${h}:${m} ${ampm}`;
}

export function getShopStatus(now: Date, config: Pick<ShopInfo, 'openTime' | 'closeTime' | 'openDays'>): ShopStatusResult {
  const { openTime, closeTime, openDays } = config;
  
  // Convert now to Asia/Kolkata timezone
  const kolkataTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(now);
  
  const kolkataDate = new Date(kolkataTime);
  const currentDay = kolkataDate.getDay();
  const currentHour = kolkataDate.getHours();
  const currentMinute = kolkataDate.getMinutes();
  
  const currentMinutesSinceMidnight = currentHour * 60 + currentMinute;
  
  const openParsed = parseTime(openTime);
  const closeParsed = parseTime(closeTime);
  
  const openMinutesSinceMidnight = openParsed.hours * 60 + openParsed.minutes;
  const closeMinutesSinceMidnight = closeParsed.hours * 60 + closeParsed.minutes;
  
  const closeLabel = formatTimeAMPM(closeTime);
  const openLabel = formatTimeAMPM(openTime);

  const result = { closeLabel, openLabel };

  if (!openDays.includes(currentDay)) {
    return { ...result, state: "closedTomorrow" };
  }

  if (currentMinutesSinceMidnight < openMinutesSinceMidnight) {
    return { ...result, state: "closedToday" };
  }

  if (currentMinutesSinceMidnight >= closeMinutesSinceMidnight) {
    return { ...result, state: "closedTomorrow" };
  }

  if (closeMinutesSinceMidnight - currentMinutesSinceMidnight <= 30) {
    return { ...result, state: "closingSoon" };
  }

  return { ...result, state: "open" };
}
