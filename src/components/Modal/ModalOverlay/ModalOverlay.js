import React from "react";

import style from "./ModalOverlay.module.css";

function ModalOverlay({ onClose }) {
  return <div onClick={onClose} className={style.overlay}></div>;
}

export default ModalOverlay;
