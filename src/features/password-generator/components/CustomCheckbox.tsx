import styles from "../styles/CustomCheckbox.module.css";
import CheckIcon from "../../../assets/icons/icon-check.svg?react";

interface CustomCheckboxProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function CustomCheckbox({ label, id, checked, onChange }: CustomCheckboxProps) {
  return (
    <label htmlFor={id} className={styles.checkbox}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.box}>
        <CheckIcon className={styles.checkIcon} />
      </span>
      {label}
    </label>
  );
}

export default CustomCheckbox;
