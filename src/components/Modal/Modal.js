import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import style from "./Modal.module.css";

import closeIcon from "../../images/close-icon.svg";

import ModalOverlay from "./ModalOverlay/ModalOverlay";
import OrderDetails from "./OrderDetails/OrderDetails";
import IngredientDetails from "./IngredientDetails/IngredientDetails";

function Modal({ isModalOpen, onClick, item }) {
  const modalRoot = document.getElementById("modals");
  const itemLength = Object.keys(item).length;

  function handleCloseOverlay(e) {
    if (e.target.className.includes("Overlay")) {
      onClick();
    }
  }

  useEffect(() => {
    const listenEsc = () => {
      if (isModalOpen) {
        onClick();
      }
    };

    document.addEventListener("keydown", listenEsc);

    return () => {
      document.removeEventListener("keydown", listenEsc);
    };
  }, [isModalOpen, onClick]);

  return createPortal(
    <section
      onClick={handleCloseOverlay}
      className={`${style.container}
        ${isModalOpen && style.container_visible}`}
    >
      <ModalOverlay />
      <div className={style.modal}>
        <div className={style.header}>
          <h2 className="text text_type_main-large">
            {itemLength > 0 && "Детали ингредиента"}
          </h2>
          <img
            onClick={onClick}
            src={closeIcon}
            alt="Закрывающий крестик"
            className={style.closeIcon}
          />
        </div>
        {itemLength > 0 && <IngredientDetails item={item} />}
      </div>
    </section>,
    modalRoot
  );
}

export default Modal;
