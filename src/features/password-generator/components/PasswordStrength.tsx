import clsx from "clsx";
import styles from "../styles/PasswordStrength.module.css";

export type StrengthLevel = "empty" | "too-weak" | "weak" | "medium" | "strong";

interface PasswordStrengthProps {
  passwordStrength: StrengthLevel;
}

const strengthConfig = {
  empty: { text: "", bars: 0, color: "" },
  "too-weak": { text: "TOO WEAK!", bars: 1, color: "red" },
  weak: { text: "WEAK", bars: 2, color: "orange" },
  medium: { text: "MEDIUM", bars: 3, color: "yellow" },
  strong: { text: "STRONG", bars: 4, color: "green" },
};

function PasswordStrength({ passwordStrength }: PasswordStrengthProps) {
  const { text, bars, color } = strengthConfig[passwordStrength];

  return (
    <div className={styles.strengthContainer}>
      <span className={styles.strengthLabel}>STRENGTH</span>
      <div className={styles.outputContainer}>
        <output className="heading-m">{text}</output>
        <ul className={clsx(styles.barContainer, styles[color])}>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className={i < bars ? styles.filled : ""} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PasswordStrength;
