import React, { Component } from "react";
import PropTypes from "prop-types";

import style from "./IngredientCard.module.css";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientCard extends Component {
  render() {
    return (
      <article className={`${style.card}`}>
        <Counter count={1} size="default" />
        <img
          src={this.props.image}
          alt="Ингредиент"
          className={`${style.card__image} pl-4 pr-4`}
        />
        <div className={`${style.card__price} pt-1 pb-1`}>
          <p className="text text_type_digits-default pr-2">
            {this.props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{this.props.name}</p>
      </article>
    );
  }
}

IngredientCard.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};

export default IngredientCard;
