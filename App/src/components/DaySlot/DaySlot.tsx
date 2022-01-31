import { Slot } from "../../types";

import * as dayjs from "dayjs";

import "./DaySlot.css";

interface DaySlotProps {
  slot: Slot;
  onClick: () => void;
}

function DaySlot({ slot, onClick }: DaySlotProps) {
  const startTime = dayjs(slot.startTime);

  return (
    <li className="DaySlot" onClick={onClick}>
      <p>
        {startTime.utc().format("HH:mm")}{" "}
        <span className="DaySlot-raw">({slot.startTime})</span>
      </p>
    </li>
  );
}

export default DaySlot;
