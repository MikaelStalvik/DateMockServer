import { AvailableSlots, Slot } from "../../types";
import CalendarDay from "../CalendarDay";
import Property from "../Property";

import "./Calendar.css";

interface CalendarProps {
  slotsData: AvailableSlots;
  onSlotClick: (selectedSlot: Slot) => void;
}

function Calendar({ slotsData, onSlotClick }: CalendarProps) {
  return (
    <div className="Calendar">
      <Property label="Timezone ID">{slotsData.timeZoneId}</Property>
      <Property label="UTC Offset">{slotsData.utcOffset}</Property>

      <section className="Calendar-slots-section">
        <h2 className="Calendar-slots-header">Available slots</h2>
        <ul className="Calendar-slots-list">
          {slotsData.days.slice(0, 4).map((d) => {
            return (
              <CalendarDay key={d.date} day={d} onSlotClick={onSlotClick} />
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Calendar;
