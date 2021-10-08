import React, { FC } from "react";
import { useSelector } from "../../utils/hooks";

import { getAllOrders } from "../../services/selectors/wsSelectors";

import { TOrder } from "../../utils/types";

import style from "./OrdersStatus.module.css";

const OrdersStatus: FC = () => {
  const allOrders = useSelector(getAllOrders);
  const { orders, total, totalToday } = allOrders;
  const ordersInfo =
    orders &&
    orders.map((el: TOrder) => {
      return { id: el._id, number: el.number, status: el.status };
    });

  const ordersDone =
    ordersInfo &&
    ordersInfo.filter(
      (el: { id: string; number: number; status: string }) =>
        el.status === "done"
    );

  const ordersInProcess =
    ordersInfo &&
    ordersInfo.filter(
      (el: { id: string; number: number; status: string }) =>
        el.status !== "done"
    );

  return (
    <section className={style.container}>
      <div className={`${style.status} mb-15`}>
        <div className={`${style.status__info}`}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={style.list}>
            <ul className={style.list__column}>
              {ordersDone &&
                ordersDone
                  .slice(0, 5)
                  .map((el: { id: string; number: number; status: string }) => (
                    <li
                      style={{ color: "#00CCCC" }}
                      className="text text_type_digits-default"
                      key={el.id}
                    >
                      {String(el.number)}
                    </li>
                  ))}
            </ul>
            <ul className={style.list__column}>
              {ordersDone &&
                ordersDone
                  .slice(5, 10)
                  .map((el: { id: string; number: number; status: string }) => (
                    <li
                      style={{ color: "#00CCCC" }}
                      className="text text_type_digits-default"
                      key={el.id}
                    >
                      {String(el.number)}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
        <div className={`${style.status__info}`}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={style.list}>
            <ul className={style.list__column}>
              {ordersInProcess &&
                ordersInProcess
                  .slice(0, 5)
                  .map((el: { id: string; number: number; status: string }) => (
                    <li className="text text_type_digits-default" key={el.id}>
                      {String(el.number)}
                    </li>
                  ))}
            </ul>
            <ul className={style.list__column}>
              {ordersInProcess &&
                ordersInProcess
                  .slice(5, 10)
                  .map((el: { id: string; number: number; status: string }) => (
                    <li className="text text_type_digits-default" key={el.id}>
                      {String(el.number)}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${style.digits} text text_type_digits-large mb-15`}>
          {total && String(total)}
        </p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${style.digits} text text_type_digits-large`}>
          {totalToday && String(totalToday)}
        </p>
      </div>
    </section>
  );
};

export default OrdersStatus;
