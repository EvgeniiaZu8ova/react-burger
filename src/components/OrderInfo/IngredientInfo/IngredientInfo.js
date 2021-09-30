import React from "react";
import PropTypes from "prop-types";

import style from "./IngredientInfo.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientInfo({ image, price, name, quantity }) {
  return (
    <div className={style.info}>
      <div className={style.component__box}>
        <img src={image} alt="Ингредиент" className={style.component__image} />
      </div>
      <p className={`text text_type_main-default ${style.name}`}>{name}</p>
      <div className={style.price}>
        <p className="text text_type_digits-default pr-2">{`${String(
          quantity
        )} x ${String(price)}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

IngredientInfo.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number,
};

export default IngredientInfo;
