import * as dayjs from "dayjs";
import { Slot } from "../../types";

import Property from "../Property";

import "./SlotPreview.css";

interface SlotPreviewProps {
  slot: Slot;
}

function SlotPreview({ slot }: SlotPreviewProps) {
  const startTimeObject = dayjs(slot.startTime);
  const endTimeObject = dayjs(slot.endTime);

  return (
    <>
      <h3 className="SlotPreview">Selected slot</h3>
      <Property label="Raw string (start)">{slot.startTime}</Property>
      <Property label="Date">{startTimeObject.format("YYYY-MM-DD")}</Property>
      <Property label="Start Time">{startTimeObject.format("HH:mm")}</Property>
      <Property label="End Time">{endTimeObject.format("HH:mm")}</Property>
      {slot.assets.map((a, i) => (
        <Property key={`property-key-${i}`} label={`Asset ${i}`}>
          {a}
        </Property>
      ))}
    </>
  );
}

export default SlotPreview;
