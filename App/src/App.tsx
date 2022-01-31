import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
dayjs.extend(utc); // use plugin

import { ChangeEvent, useEffect, useState } from "react";
import { getAvailableSlots } from "./api/calendar";

import "./App.css";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import MarketSelect from "./components/MarketSelect";
import SlotPreview from "./components/SlotPreview";
import { AvailableSlots, Slot } from "./types";

function App() {
  const [selectedMarket, setSelectedMarket] = useState("uk");
  const [slotsData, setSlotsData] = useState<AvailableSlots>();
  const [selectedSlot, setSelectedSlot] = useState<Slot>();

  useEffect(() => {
    const data = getAvailableSlots("uk");
    setSlotsData(data);
  }, []);

  function changeSelectedMarket(e: ChangeEvent<HTMLInputElement>) {
    const market = e.target.value;

    if (market !== selectedMarket) {
      const data = getAvailableSlots(market);
      setSlotsData(data);
      setSelectedMarket(market);
      setSelectedSlot(null);
    }
  }

  function handleSelectedSlot(newSelectedSlot: Slot) {
    setSelectedSlot(newSelectedSlot);
  }

  return (
    <div className="App">
      <Header>New Booking Calendar</Header>

      <div className="App-layout">
        <main className="App-calendar">
          <MarketSelect
            selectedMarket={selectedMarket}
            onMarketSelect={changeSelectedMarket}
          />
          {slotsData && (
            <Calendar slotsData={slotsData} onSlotClick={handleSelectedSlot} />
          )}
        </main>

        <aside className="App-request">
          {selectedSlot ? (
            <SlotPreview slot={selectedSlot} />
          ) : (
            "Select an available slot to preview..."
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
