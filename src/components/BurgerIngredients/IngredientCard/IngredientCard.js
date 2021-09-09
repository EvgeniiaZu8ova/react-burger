import React from "react";
import PropTypes from "prop-types";

import style from "./IngredientCard.module.css";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientCard({ image, price, name, quantity = 0 }) {
  return (
    <article className={`${style.card}`}>
      {quantity > 0 && <Counter count={quantity} size="default" />}
      <img
        src={image}
        alt="Ингредиент"
        className={`${style.card__image} pl-4 pr-4`}
      />
      <div className={`${style.card__price} pt-1 pb-1`}>
        <p className="text text_type_digits-default pr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.card__title} text text_type_main-default`}>
        {name}
      </p>
    </article>
  );
}

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number,
};

export default IngredientCard;
