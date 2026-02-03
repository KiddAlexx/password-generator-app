import { useEffect, useRef } from "react";
import CustomButton from "./CustomButton";
import styles from "../styles/ErrorModal.module.css";

interface ErrorModalProps {
  errorMessage?: string | null;
  handleClearError?: () => void;
}

export default function ErrorModal({
  errorMessage,
  handleClearError,
}: ErrorModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (errorMessage) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [errorMessage]);

  // Ensure error message in parent is cleared on escape keypress
  function onCancel(e: React.SyntheticEvent<HTMLDialogElement>) {
    e.preventDefault();
    handleClearError?.();
  }

  // Ensure error message in parent is cleared on close
  function onClose() {
    handleClearError?.();
  }

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      onCancel={onCancel}
      onClose={onClose}
    >
      <h2 className={`heading-m ${styles.title}`}>Error!</h2>
      <p className={styles.message}>{errorMessage}</p>

      <CustomButton type="button" onClick={() => handleClearError?.()}>
        Close
      </CustomButton>
    </dialog>
  );
}
