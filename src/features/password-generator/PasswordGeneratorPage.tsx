import { useState } from "react";
import CustomCheckbox from "./components/CustomCheckbox";
import CustomSlider from "./components/CustomSlider";
import styles from "./styles/PasswordGeneratorPage.module.css";
import CustomButton from "./components/CustomButton";
import RightArrowIcon from "../../assets/icons/icon-arrow-right.svg?react";
import PasswordStrength from "./components/PasswordStrength";
import type { PasswordOptions, StrengthLevel } from "../../types/passwordTypes";
import calculateStrength from "../../utils/calculateStrength";
import PasswordDisplay from "./components/PasswordDisplay";
import generatePassword from "../../utils/generatePassword";
import ErrorModal from "./components/ErrorModal";

function PasswordGeneratorPage() {
  const [options, setOptions] = useState<PasswordOptions>({
    includeUpper: false,
    includeLower: false,
    includeNumbers: false,
    includeSymbols: false,
    characterLength: 0,
  });

  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const strength: StrengthLevel = calculateStrength(options);

  function handleClick() {
    const passwordResult = generatePassword(options);
    if (!passwordResult.ok) {
      setPassword(null);
      setError(passwordResult.error);
      return;
    }

    setPassword(passwordResult.password);
    setError(null);
  }

  function handleClearError() {
    setError(null);
  }

  return (
    <>
      <ErrorModal errorMessage={error} handleClearError={handleClearError} />
      <div className={styles.passwordGenPage}>
        <h1 className="heading-m">Password Generator</h1>
        <div className={styles.appContainer}>
          <div className={styles.displayContainer}>
            <PasswordDisplay
              password={password}
              onError={(errorMessage) => setError(errorMessage)}
            />
          </div>
          <div className={styles.controlsContainer}>
            <CustomSlider
              characterLength={options.characterLength}
              handleChange={(value) => {
                setOptions((prev) => ({
                  ...prev,
                  characterLength: value,
                }));
              }}
            />
            <fieldset className={styles.checkboxContainer}>
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
            <PasswordStrength level={strength} />
            <CustomButton aria-label="Generate password" onClick={handleClick}>
              GENERATE <RightArrowIcon />
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGeneratorPage;
