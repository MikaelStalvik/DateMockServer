import { AvailableSlots } from "../types";

import dataFinish from "./dataFi";
import dataSwedish from "./dataSe";
import dataUk from "./dataUk";

export function getAvailableSlots(market: string) {
  let data: AvailableSlots;

  if (market === "fi") {
    data = dataFinish;
  } else if (market === "se") {
    data = dataSwedish;
  } else {
    data = dataUk;
  }

  return data;
}
