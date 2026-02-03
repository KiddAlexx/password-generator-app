import styles from "../styles/PasswordDisplay.module.css";
import CopyIcon from "../../../assets/icons/icon-copy.svg?react";
import clsx from "clsx";
import { useState } from "react";
import type { Password } from "../../../types/passwordTypes";

interface PasswordDisplayProps {
  password: Password | null;
  onError?: (errorMessage: string) => void;
}

function PasswordDisplay({ password, onError }: PasswordDisplayProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async function () {
    if (!password) {
      setCopied(false);
      onError?.("No password to copy. Generate one first");
      return;
    }
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      onError?.(`Failed to copy password: ${err}`);
    }
  };

  return (
    <div className={styles.displayContainer}>
      <output
        className={clsx(
          "heading-l",
          password ? styles.passwordOutput : styles.placeholder,
        )}
      >
        {password || "P4$5W0rD!"}
      </output>
      <div className={styles.copyContainer}>
        {copied && <span className={styles.copyLabel}>COPIED</span>}
        <button
          onClick={handleCopy}
          className={styles.copyButton}
          aria-label="Copy password"
        >
          <CopyIcon className={styles.copyIcon} />
        </button>
      </div>
    </div>
  );
}

export default PasswordDisplay;
