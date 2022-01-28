export interface Slot {
  startTime: string;
  endTime: string;
  assets: string[];
}

export interface Day {
  date: string;
  slots: Slot[];
}

export interface AvailableSlots {
  days: Day[];
  utcOffset: number;
  timeZoneId: string;
}
