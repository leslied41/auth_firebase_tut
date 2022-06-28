import React, { useState } from "react";
import "./Slider.scss";

const Slider = () => {
  const [value, setValue] = useState(1);
  return (
    <div>
      <div className="slider-container">
        <input
          className="slider"
          type="range"
          min="1"
          max="100"
          onChange={(e) => setValue(e.target.value)}
        />
        <p>{value}</p>
      </div>
    </div>
  );
};
export default Slider;
