import type { ButtonHTMLAttributes } from "react";
import styles from "../styles/CustomButton.module.css";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function CustomButton({ ...props }: CustomButtonProps) {
  return <button {...props} className={styles.customButton} />;
}

export default CustomButton;
