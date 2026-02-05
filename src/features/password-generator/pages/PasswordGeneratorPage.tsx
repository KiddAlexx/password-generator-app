// React imports
import { useState } from "react";

// Styles
import styles from "../styles/PasswordGeneratorPage.module.css";

// Assets
import RightArrowIcon from "../../../assets/icons/icon-arrow-right.svg?react";

// Components
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomSlider from "../components/CustomSlider";
import ErrorModal from "../components/ErrorModal";
import PasswordDisplay from "../components/PasswordDisplay";
import PasswordStrength from "../components/PasswordStrength";

// Utils
import calculateStrength from "../../../utils/calculateStrength";
import generatePassword from "../../../utils/generatePassword";

// Type imports
import type {
  PasswordOptions,
  StrengthLevel,
} from "../../../types/passwordTypes";

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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Calculate password strength based on selected options
  const strength: StrengthLevel = calculateStrength(options);

  function handleGeneratePassword() {
    const passwordResult = generatePassword(options);
    if (!passwordResult.ok) {
      setPassword(null);
      setError(passwordResult.error);
      return;
    }

    setPassword(passwordResult.password);
    setError(null);
    setStatusMessage("Password generated.");
    setTimeout(() => setStatusMessage(null), 1000);
  }

  function handleClearError() {
    setError(null);
  }

  return (
    <main>
      {error && (
        <ErrorModal errorMessage={error} handleClearError={handleClearError} />
      )}
      <div className="srOnly" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>
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
            <CustomButton
              aria-label="Generate password"
              onClick={handleGeneratePassword}
            >
              GENERATE <RightArrowIcon />
            </CustomButton>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PasswordGeneratorPage;
