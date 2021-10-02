import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { convertDate } from "../../../utils/dateConverter";

import style from "./OrderCard.module.css";

function OrderCard({ data, isProfile }) {
  const { allIngredients } = useSelector((store) => store.allIngredients);

  const cardIngredients = data.ingredients.map((el) => {
    const item = allIngredients.find((item) => item._id === el);
    return {
      image: item && item.image,
      price: item && item.price,
    };
  });

  const finalSum = cardIngredients.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  const restQuantity = cardIngredients.length - 6;

  const convertedDate = convertDate(data.createdAt);

  return (
    <article
      className={`${style.card} ${isProfile ? "mb-6" : "mb-4"} ${
        isProfile && style.card_big
      }`}
    >
      <div className={style.info}>
        <p className="text text_type_digits-default">{`#${data.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          {String(convertedDate)}
        </p>
      </div>
      <p
        className={`text text_type_main-medium mt-6 ${
          isProfile ? "mb-2" : "mb-6"
        }`}
      >
        {data.name}
      </p>
      {isProfile && (
        <p className="text text_type_main-default mb-6">
          {data.status === "done" ? "Выполнен" : "В процессе"}
        </p>
      )}

      <div className={style.details}>
        <div className={style.components}>
          {cardIngredients &&
            cardIngredients.slice(0, 6).map((el, index) => (
              <div key={index} className={style.component__box}>
                <img
                  src={el.image}
                  alt="Ингредиент"
                  className={style.component__image}
                />
                {index === 5 && restQuantity > 0 && (
                  <p
                    className={`${style.component__count} text text_type_main-default`}
                  >
                    {`+${String(restQuantity)}`}
                  </p>
                )}
              </div>
            ))}
        </div>
        <div className={`${style.price} pt-1 pb-1`}>
          <p className="text text_type_digits-default pr-2">
            {String(finalSum)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
}

OrderCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    ingredients: PropTypes.array,
    status: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    number: PropTypes.number,
  }),
  isProfile: PropTypes.bool.isRequired,
};

export default OrderCard;
