import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import style from "./Modal.module.css";

import closeIcon from "../../images/close-icon.svg";

import ModalOverlay from "./ModalOverlay/ModalOverlay";

function Modal({ isModalOpen, onClick }) {
  const modalRoot = document.getElementById("modals");

  function handleCloseOverlay(e) {
    if (e.target.className.includes("Overlay")) {
      onClick();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onClick);

    return () => {
      document.removeEventListener("keydown", onClick);
    };
  }, [onClick]);

  return createPortal(
    <section
      onClick={handleCloseOverlay}
      className={`${style.container}
        ${isModalOpen && style.container_visible}`}
    >
      <ModalOverlay />
      <div className={style.modal}>
        <div className={style.header}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <img
            onClick={onClick}
            src={closeIcon}
            alt="Закрывающий крестик"
            className={style.closeIcon}
          />
        </div>
      </div>
    </section>,
    modalRoot
  );
}

export default Modal;
