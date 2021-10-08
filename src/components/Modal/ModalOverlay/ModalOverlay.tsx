import React, { FC } from "react";

import style from "./ModalOverlay.module.css";

interface ModalOverlayProps {
  onClose: (e: any) => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return <div onClick={onClose} className={style.overlay}></div>;
};

export default ModalOverlay;
