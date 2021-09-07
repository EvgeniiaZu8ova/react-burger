import React from "react";
import PropTypes from "prop-types";

import style from "./ModalOverlay.module.css";

function ModalOverlay({ onClose }) {
  return <div onClick={onClose} className={style.overlay}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
