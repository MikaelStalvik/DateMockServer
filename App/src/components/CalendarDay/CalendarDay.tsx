import { Day, Slot } from "../../types";
import DaySlot from "../DaySlot";

import "./CalendarDay.css";

interface CalendarDayProps {
  day: Day;
  onSlotClick: (selectedSlot: Slot) => void;
}

function CalendarDay({ day, onSlotClick }: CalendarDayProps) {
  return (
    <li className="CalendarDay">
      <p className="CalendarDay-date">{day.date}</p>
      <ul className="CalendarDay-list">
        {day.slots.map((s) => {
          return (
            <DaySlot
              key={s.startTime}
              slot={s}
              onClick={() => onSlotClick(s)}
            />
          );
        })}
      </ul>
    </li>
  );
}

export default CalendarDay;
