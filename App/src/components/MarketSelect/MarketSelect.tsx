import "./MarketSelect.css";

import { ChangeEvent } from "react";

interface MarketSelectProps {
  selectedMarket: string;
  onMarketSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

function MarketSelect({ selectedMarket, onMarketSelect }: MarketSelectProps) {
  return (
    <div className="MarketSelect">
      <label>
        <input
          type="radio"
          value="uk"
          checked={selectedMarket === "uk"}
          onChange={onMarketSelect}
        />
        UK
      </label>

      <label>
        <input
          type="radio"
          value="se"
          checked={selectedMarket === "se"}
          onChange={onMarketSelect}
        />
        Sweden
      </label>

      <label>
        <input
          type="radio"
          value="fi"
          checked={selectedMarket === "fi"}
          onChange={onMarketSelect}
        />
        Finland
      </label>
    </div>
  );
}

export default MarketSelect;
