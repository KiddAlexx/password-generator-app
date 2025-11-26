import { useState } from "react";
import styles from "../styles/CustomSlider.module.css";

function CustomSlider({ min = 1, max = 20 }) {
  const [value, setValue] = useState(10);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.labelContainer}>
        <label htmlFor="lengthSlider" className={styles.label}>
          Character Length
        </label>
        <output htmlFor="lengthSlider" className={`${styles.value} heading-l`}>
          {value}
        </output>
      </div>

      <input
        id="lengthSlider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right,
                      var(--color-neon-green) 0%,
                      var(--color-neon-green) ${percent}%,
                      var(--color-vdark-grey) ${percent}%,
                      var(--color-vdark-grey) 100%)`,
        }}
      />
    </div>
  );
}

export default CustomSlider;
