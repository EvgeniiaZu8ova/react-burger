import React from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { convertDate } from "../../utils/dateConverter.ts";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientInfo from "./IngredientInfo/IngredientInfo";

import style from "./OrderInfo.module.css";
import { frequencyCounter } from "../../utils/frequencyCounter.ts";
import {
  getAllOrders,
  getMyOrders,
} from "../../services/selectors/wsSelectors";
import { handleOrderSearchWithId } from "../../utils/findItem.ts";

function OrderInfo() {
  const { currentOrder } = useSelector((store) => store.orderCardModal);
  const { myCurrentOrder } = useSelector((store) => store.myOrderCardModal);
  const allOrders = useSelector(getAllOrders);
  const { orders: allExistingOrders } = allOrders;
  const myOrders = useSelector(getMyOrders);
  const { orders: myExistingOrders } = myOrders;
  const { allIngredients } = useSelector((store) => store.allIngredients);

  const { id } = useParams();

  const item =
    (allExistingOrders && handleOrderSearchWithId(allExistingOrders, id)) || {};
  const myItem =
    (myExistingOrders && handleOrderSearchWithId(myExistingOrders, id)) || {};

  const currentItem =
    Object.keys(currentOrder).length > 0
      ? currentOrder
      : Object.keys(myCurrentOrder).length > 0
      ? myCurrentOrder
      : Object.keys(item).length > 0
      ? item
      : myItem;

  const { number, name, status, ingredients, createdAt } = currentItem;

  const currentIngredients = ingredients && frequencyCounter(ingredients);

  const cardIngredients =
    currentIngredients &&
    currentIngredients.map((el) => {
      const item = allIngredients.find((item) => item._id === el.id);
      return {
        image: item && item.image,
        price: item && item.price,
        name: item && item.name,
        quantity: el.quantity,
      };
    });

  const finalSum =
    cardIngredients &&
    cardIngredients.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);

  const convertedDate = createdAt ? convertDate(createdAt) : "";

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
        {cardIngredients &&
          cardIngredients.map((el, index) => (
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
