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
      <Property label="slot.startTime">{slot.startTime}</Property>
      <Property label="Dayjs UTC">{startTimeObject.utc().toString()}</Property>
      <Property label="Dayjs UTC HH:mm">
        {startTimeObject.utc().format("HH:mm")}
      </Property>
      <Property label="Local time HH:mm">
        {startTimeObject.format("HH:mm")}
      </Property>
      {slot.assets.map((a, i) => (
        <Property key={`property-key-${i}`} label={`Asset ${i}`}>
          {a}
        </Property>
      ))}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 className="SlotPreview">Request</h3>
        <code>"date": "{startTimeObject.utc().format("YYYY-MM-DD")}",</code>
        <code>"start": "{startTimeObject.utc().format("HH:mm")}",</code>
        <code>"end": "{endTimeObject.utc().format("HH:mm")}",</code>
        <code>"slotStartTime": "{slot.startTime}"</code>
        <code>"asset": "{slot.assets[0]}"</code>
      </div>
    </>
  );
}

export default SlotPreview;
