import React, { FC, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

import style from "./Modal.module.css";

import closeIcon from "../../images/close-icon.svg";

import ModalOverlay from "./ModalOverlay";

interface ModalProps {
  isModalOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isModalOpen, title, children, onClose }) => {
  const modalRoot: any = document.getElementById("modals");

  function handleCloseOverlay(e: any) {
    if (e.target.className.includes("Overlay")) {
      onClose();
    }
  }

  useEffect(() => {
    const listenEsc = (e: any) => {
      if (isModalOpen && e.key === "Escape") {
        onClose();
      }
    };

    if (!isModalOpen) return;
    document.addEventListener("keydown", listenEsc);

    return () => {
      document.removeEventListener("keydown", listenEsc);
    };
  }, [isModalOpen, onClose]);

  return createPortal(
    <section
      className={`${style.container}
        ${isModalOpen && style.container_visible}`}
    >
      <ModalOverlay onClose={handleCloseOverlay} />
      <div className={style.modal}>
        <div className={style.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <img
            onClick={onClose}
            src={closeIcon}
            alt="Закрывающий крестик"
            className={style.closeIcon}
          />
        </div>
        {children}
      </div>
    </section>,
    modalRoot
  );
};

export default Modal;
