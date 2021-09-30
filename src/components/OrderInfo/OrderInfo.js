import React from "react";

import data from "../../assets/orders-mock-data.json";

import { useSelector } from "react-redux";

import { convertDate } from "../../utils/dateConverter";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientInfo from "./IngredientInfo/IngredientInfo";

import style from "./OrderInfo.module.css";
import { frequencyCounter } from "../../utils/frequencyCounter";

function OrderInfo() {
  const { allIngredients } = useSelector((store) => store.allIngredients);
  const { number, name, status, ingredients, createdAt } = data[4];

  const cardIngredients = frequencyCounter(ingredients).map((el) => {
    const item = allIngredients.find((item) => item._id === el.id);
    return {
      image: item && item.image,
      price: item && item.price,
      name: item && item.name,
      quantity: el.quantity,
    };
  });

  const finalSum = cardIngredients.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  const convertedDate = convertDate(createdAt);

  return (
    <section className={style.container}>
      <p className="text text_type_digits-default mb-10">{`#${number}`}</p>
      <p
        style={{ alignSelf: "flex-start" }}
        className="text text_type_main-medium mb-3"
      >
        {name}
      </p>
      <p
        style={{ color: "#00CCCC", alignSelf: "flex-start" }}
        className="text text_type_main-default mb-15"
      >
        {status === "done" ? "Выполнен" : "В процессе"}
      </p>
      <p
        style={{ alignSelf: "flex-start" }}
        className="text text_type_main-medium mb-6"
      >
        Состав:
      </p>
      <div className={`${style.scrollArea} mb-10`}>
        {cardIngredients.map((el, index) => (
          <IngredientInfo
            key={index}
            image={el.image}
            price={el.price}
            name={el.name}
            quantity={el.quantity}
          />
        ))}
      </div>
      <div className={style.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          {String(convertedDate)}
        </p>
        <div className={`${style.price} pt-1 pb-1`}>
          <p className="text text_type_digits-default pr-2">
            {String(finalSum)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

export default OrderInfo;
