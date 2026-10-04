import { describe, it, expect } from 'vitest';
import { getShopStatus } from './shopStatus';

describe('getShopStatus', () => {
  const config = {
    openTime: "10:00",
    closeTime: "21:30",
    openDays: [1, 2, 3, 4, 5, 6], // Closed on Sunday (0)
  };

  // Helper to create a date in Kolkata time for tests
  // We use the reverse offset so that when formatted to Kolkata, it represents the exact intended time
  const createDate = (isoString: string) => new Date(isoString);

  it('is closed on a closed day', () => {
    // Sunday, Oct 4, 2026, 12:00 PM Kolkata time
    const date = createDate("2026-10-04T12:00:00+05:30");
    const result = getShopStatus(date, config);
    expect(result.state).toBe("closedTomorrow");
    expect(result.openLabel).toBe("10:00 AM");
    expect(result.closeLabel).toBe("9:30 PM");
  });

  it('is closedToday just before open', () => {
    // Monday, Oct 5, 2026, 09:59 AM Kolkata time
    const date = createDate("2026-10-05T09:59:00+05:30");
    const result = getShopStatus(date, config);
    expect(result.state).toBe("closedToday");
  });

  it('is open exactly at open time', () => {
    // Monday, Oct 5, 2026, 10:00 AM Kolkata time
    const date = createDate("2026-10-05T10:00:00+05:30");
    const result = getShopStatus(date, config);
    expect(result.state).toBe("open");
  });

  it('is open mid-day', () => {
    // Monday, Oct 5, 2026, 02:00 PM Kolkata time
    const date = createDate("2026-10-05T14:00:00+05:30");
    const result = getShopStatus(date, config);
    expect(result.state).toBe("open");
  });

  it('is closingSoon exactly 30 minutes before close', () => {
    // Monday, Oct 5, 2026, 09:00 PM Kolkata time
    const date = createDate("2026-10-05T21:00:00+05:30");
    const result = getShopStatus(date, config);
    expect(result.state).toBe("closingSoon");
  });

  it('is closingSoon 5 minutes before close', () => {
    // Monday, Oct 5, 2026, 09:25 PM Kolkata time
    const date = createDate("2026-10-05T21:25:00+05:30");
    const result = getShopStatus(date, config);
    expect(result.state).toBe("closingSoon");
  });

  it('is closed exactly at close time', () => {
    // Monday, Oct 5, 2026, 09:30 PM Kolkata time
    const date = createDate("2026-10-05T21:30:00+05:30");
    const result = getShopStatus(date, config);
    expect(result.state).toBe("closedTomorrow");
  });
});
