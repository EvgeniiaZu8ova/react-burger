import React from "react";
import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./OrderCard.module.css";

function OrderCard() {
  return (
    <article className={style.card}>
      <div className={style.info}>
        <p className="text text_type_digits-default">#034534</p>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 13:20 i-GMT+3
        </p>
      </div>
      <p className="text text_type_main-medium mt-6 mb-6">
        Interstellar бургер
      </p>
      <div className={style.details}>
        <div className={style.components}>
          <div className={style.component__box}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              alt="Ингредиент"
              className={style.component__image}
            />
          </div>
          <div className={style.component__box}>
            <img
              src="https://code.s3.yandex.net/react/code/meat-03.png"
              alt="Ингредиент"
              className={style.component__image}
            />
          </div>
          <div className={style.component__box}>
            <img
              src="https://code.s3.yandex.net/react/code/meat-04.png"
              alt="Ингредиент"
              className={style.component__image}
            />
          </div>
          <div className={style.component__box}>
            <img
              src="https://code.s3.yandex.net/react/code/meat-01.png"
              alt="Ингредиент"
              className={style.component__image}
            />
          </div>
          <div className={style.component__box}>
            <img
              src="https://code.s3.yandex.net/react/code/sauce-02.png"
              alt="Ингредиент"
              className={style.component__image}
            />
          </div>
          <div className={style.component__box}>
            <img
              src="https://code.s3.yandex.net/react/code/sauce-03.png"
              alt="Ингредиент"
              className={style.component__image}
            />
            <p
              className={`${style.component__count} text text_type_main-default`}
            >
              +3
            </p>
          </div>
        </div>
        <div className={`${style.price} pt-1 pb-1`}>
          <p className="text text_type_digits-default pr-2">560</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
