import CustomSlider from "./components/CustomSlider";
import styles from "./styles/PasswordGeneratorPage.module.css";

function PasswordGeneratorPage() {
  return (
    <div className={styles.appContainer}>
      <div>
        <h1 className="heading-m">Password Generator</h1>
        <CustomSlider />
      </div>
    </div>
  );
}

export default PasswordGeneratorPage;
