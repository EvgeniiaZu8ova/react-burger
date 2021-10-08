import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientInfo from "./IngredientInfo";

import style from "./OrderInfo.module.css";

import { convertDate } from "../../utils/dateConverter";
import { frequencyCounter } from "../../utils/frequencyCounter";
import { handleOrderSearchWithId } from "../../utils/findItem";
import { TParamsWithIdState } from "../../utils/types";
import { useSelector } from "../../utils/hooks";

import {
  getAllOrders,
  getMyOrders,
} from "../../services/selectors/wsSelectors";

const OrderInfo: FC = () => {
  const { currentOrder } = useSelector((store) => store.orderCardModal);
  const { myCurrentOrder } = useSelector((store) => store.myOrderCardModal);
  const allOrders = useSelector(getAllOrders);
  const { orders: allExistingOrders } = allOrders;
  const myOrders = useSelector(getMyOrders);
  const { orders: myExistingOrders } = myOrders;
  const { allIngredients } = useSelector((store) => store.allIngredients);

  const { id } = useParams<TParamsWithIdState>();

  const item =
    (allExistingOrders && handleOrderSearchWithId(allExistingOrders, id)) || {};
  const myItem =
    (myExistingOrders && handleOrderSearchWithId(myExistingOrders, id)) || {};

  const currentItem =
    currentOrder && currentOrder.name && currentOrder.name.length > 0
      ? currentOrder
      : myCurrentOrder && myCurrentOrder.name && myCurrentOrder.name.length > 0
      ? myCurrentOrder
      : item && item.name && item.name.length > 0
      ? item
      : myItem;

  const { number, name, status, ingredients, createdAt } = currentItem;

  const currentIngredients = ingredients && frequencyCounter(ingredients);

  const cardIngredients =
    currentIngredients &&
    currentIngredients.map((el: { id: string; quantity: number }) => {
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
    cardIngredients.reduce(
      (
        acc: number,
        curr: { image: string; price: number; name: string; quantity: number }
      ) => {
        return acc + curr.price * curr.quantity;
      },
      0
    );

  const convertedDate = createdAt ? convertDate(createdAt) : "";

  return (
    <section className={style.container}>
      <p className="text text_type_digits-default mb-10">{`#${
        number ? String(number) : ""
      }`}</p>
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
          cardIngredients.map(
            (
              el: {
                image: string;
                price: number;
                name: string;
                quantity: number;
              },
              index: number
            ) => (
              <IngredientInfo
                key={index}
                image={el.image}
                price={el.price}
                name={el.name}
                quantity={el.quantity}
              />
            )
          )}
      </div>
      <div className={style.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          {String(convertedDate)}
        </p>
        <div className={`${style.price} pt-1 pb-1`}>
          <p className="text text_type_digits-default pr-2">
            {finalSum ? String(finalSum) : ""}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

export default OrderInfo;
