import styles from "../styles/CustomCheckbox.module.css";
import CheckIcon from "../../../assets/icons/icon-check.svg?react";

interface CustomCheckboxProps {
  label: string;
  id: string;
}

function CustomCheckbox({ label, id }: CustomCheckboxProps) {
  return (
    <label htmlFor={id} className={styles.checkbox}>
      <input type="checkbox" id={id} />
      <span className={styles.box}>
        <CheckIcon className={styles.checkIcon} />
      </span>
      {label}
    </label>
  );
}

export default CustomCheckbox;
