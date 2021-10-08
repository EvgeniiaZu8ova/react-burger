import React, { FC } from "react";

import style from "./IngredientInfo.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientInfoProps {
  image: string;
  price: number;
  name: string;
  quantity: number;
}

const IngredientInfo: FC<IngredientInfoProps> = ({
  image,
  price,
  name,
  quantity,
}) => {
  return (
    <div className={style.info}>
      <div className={style.component__box}>
        <img src={image} alt="Ингредиент" className={style.component__image} />
      </div>
      <p className={`text text_type_main-default ${style.name}`}>{name}</p>
      <div className={style.price}>
        <p className="text text_type_digits-default pr-2">{`${
          quantity ? String(quantity) : ""
        } x ${price ? String(price) : ""}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default IngredientInfo;
