import { useState } from "react";
import CustomCheckbox from "./components/CustomCheckbox";
import CustomSlider from "./components/CustomSlider";
import styles from "./styles/PasswordGeneratorPage.module.css";

function PasswordGeneratorPage() {
  const [options, setOptions] = useState({
    includeUpper: false,
    includeLower: false,
    includeNumbers: false,
    includeSymbols: false,
    characterLength: 10,
  });

  return (
    <div className={styles.passwordGenPage}>
      <h1 className="heading-m">Password Generator</h1>
      <div className={styles.appContainer}>
        <CustomSlider
          characterLength={options.characterLength}
          handleChange={(value) => {
            setOptions((prev) => ({
              ...prev,
              characterLength: value,
            }));
          }}
        />
        <fieldset>
          <legend className="srOnly">Character options</legend>
          <CustomCheckbox
            checked={options.includeUpper}
            id="uppercase"
            label="Include Uppercase Letters"
            onChange={() =>
              setOptions((prev) => ({
                ...prev,
                includeUpper: !prev.includeUpper,
              }))
            }
          />
          <CustomCheckbox
            checked={options.includeLower}
            id="lowercase"
            label="Include Lowercase Letters"
            onChange={() =>
              setOptions((prev) => ({
                ...prev,
                includeLower: !prev.includeLower,
              }))
            }
          />
          <CustomCheckbox
            checked={options.includeNumbers}
            id="numbers"
            label="Include Numbers"
            onChange={() =>
              setOptions((prev) => ({
                ...prev,
                includeNumbers: !prev.includeNumbers,
              }))
            }
          />
          <CustomCheckbox
            checked={options.includeSymbols}
            id="symbols"
            label="Include Symbols"
            onChange={() =>
              setOptions((prev) => ({
                ...prev,
                includeSymbols: !prev.includeSymbols,
              }))
            }
          />
        </fieldset>
      </div>
    </div>
  );
}

export default PasswordGeneratorPage;
