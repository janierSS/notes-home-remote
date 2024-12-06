import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If modal is open, add event listeners for accessibility

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Clicking the backdrop should close the modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  // The markup for the modal itself
  const modalContent = (
    <div
      className={styles["modal-backdrop"]}
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className={styles["modal-content"]}>{children}</div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;
