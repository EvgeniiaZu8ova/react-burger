import React from "react";

import data from "../../assets/orders-mock-data.json";

import style from "./OrdersStatus.module.css";

const ordersInfo = data.map((el) => {
  return { id: el._id, number: el.number, status: el.status };
});

const ordersDone = ordersInfo.filter((el) => el.status === "done");
const ordersInProcess = ordersInfo.filter((el) => el.status !== "done");

function OrdersStatus() {
  return (
    <section className={style.container}>
      <div className={`${style.status} mb-15`}>
        <div className={`${style.status__info}`}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={style.list}>
            <ul className={style.list__column}>
              {ordersDone.slice(0, 5).map((el) => (
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
              {ordersDone.slice(5, 10).map((el) => (
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
              {ordersInProcess.slice(0, 5).map((el) => (
                <li className="text text_type_digits-default" key={el.id}>
                  {String(el.number)}
                </li>
              ))}
            </ul>
            <ul className={style.list__column}>
              {ordersInProcess.slice(5, 10).map((el) => (
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
          28752
        </p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${style.digits} text text_type_digits-large`}>138</p>
      </div>
    </section>
  );
}

export default OrdersStatus;
