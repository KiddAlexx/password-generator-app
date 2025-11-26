import CustomCheckbox from "./components/CustomCheckbox";
import CustomSlider from "./components/CustomSlider";
import styles from "./styles/PasswordGeneratorPage.module.css";

function PasswordGeneratorPage() {
  return (
    <div className={styles.passwordGenPage}>
      <h1 className="heading-m">Password Generator</h1>
      <div className={styles.appContainer}>
        <CustomSlider />
        <fieldset>
          <legend className="srOnly">Character options</legend>
          <CustomCheckbox id="uppercase" label="Include Uppercase Letters" />
          <CustomCheckbox id="lowercase" label="Include Lowercase Letters" />
          <CustomCheckbox id="numbers" label="Include Numbers" />
          <CustomCheckbox id="symbols" label="Include Symbols" />
        </fieldset>
      </div>
    </div>
  );
}

export default PasswordGeneratorPage;
