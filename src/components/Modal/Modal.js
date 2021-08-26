import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import style from "./Modal.module.css";

import closeIcon from "../../images/close-icon.svg";

import ModalOverlay from "./ModalOverlay/ModalOverlay";

function Modal({ isModalOpen, title, children, onClose }) {
  const modalRoot = document.getElementById("modals");

  function handleCloseOverlay(e) {
    if (e.target.className.includes("Overlay")) {
      onClose();
    }
  }

  useEffect(() => {
    const listenEsc = () => {
      if (isModalOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", listenEsc);

    return () => {
      document.removeEventListener("keydown", listenEsc);
    };
  }, [isModalOpen, onClose]);

  return createPortal(
    <section
      onClick={handleCloseOverlay}
      className={`${style.container}
        ${isModalOpen && style.container_visible}`}
    >
      <ModalOverlay />
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
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
