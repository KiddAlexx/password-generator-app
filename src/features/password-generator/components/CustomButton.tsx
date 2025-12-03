import type { ReactNode } from "react";
import styles from "../styles/CustomButton.module.css";

interface CustomButtonProps {
  children: ReactNode;
}

function CustomButton({ children }: CustomButtonProps) {
  return <button className={styles.customButton}>{children}</button>;
}

export default CustomButton;
