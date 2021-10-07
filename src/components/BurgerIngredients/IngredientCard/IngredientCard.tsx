import React, { FC } from "react";
import { useDrag } from "react-dnd";

import style from "./IngredientCard.module.css";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientCardProps {
  image: string | undefined;
  price: number;
  name: string;
  quantity?: number;
}

const IngredientCard: FC<IngredientCardProps> = ({
  image,
  price,
  name,
  quantity = 0,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <article
      ref={drag}
      id="ingredient"
      className={`${style.card} ${isDragging && style.card_transparent}`}
    >
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
};

export default IngredientCard;
