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
    } catch {
      onError?.(`Failed to copy password:`);
    }
  };

  return (
    <div className={styles.displayContainer}>
      <p
        className={clsx(
          "heading-l",
          password ? styles.passwordOutput : styles.placeholder,
        )}
      >
        {password ? (
          <span>{password}</span>
        ) : (
          <div>
            <span className="srOnly">No password generated</span>
            <span aria-hidden="true">P4$5W0rD!</span>
          </div>
        )}
      </p>
      <div className={styles.copyContainer}>
        {/* Announce copied action to screen readers */}
        <span className="srOnly" aria-live="polite" aria-atomic="true">
          {copied ? "Password copied to clipboard." : ""}
        </span>
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
