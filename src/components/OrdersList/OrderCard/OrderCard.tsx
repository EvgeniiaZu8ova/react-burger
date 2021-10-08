import React, { FC } from "react";

import { useSelector } from "../../../utils/hooks";
import { convertDate } from "../../../utils/dateConverter";
import { TOrder } from "../../../utils/types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./OrderCard.module.css";

interface OrderCardProps {
  data: TOrder;
  isProfile: boolean;
}

const OrderCard: FC<OrderCardProps> = ({ data, isProfile }) => {
  const { allIngredients } = useSelector((store) => store.allIngredients);

  const cardIngredients = data.ingredients.map((el) => {
    const item = allIngredients.find((item) => item._id === el);
    return {
      image: item && item.image,
      price: item && item.price,
    };
  });

  const finalSum = cardIngredients.reduce(
    (
      acc: number,
      curr: { image: string | undefined; price: number | undefined }
    ) => {
      return acc + (curr.price ? curr.price : 0);
    },
    0
  );

  const restQuantity = cardIngredients.length - 6;

  const convertedDate = data.createdAt ? convertDate(data.createdAt) : "";

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
};

export default OrderCard;
