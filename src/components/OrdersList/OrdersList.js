import React from "react";

import OrderCard from "./OrderCard/OrderCard";

import data from "../../assets/orders-mock-data.json";

import style from "./OrdersList.module.css";

function OrdersList() {
  return (
    <section className={style.section}>
      <h1 className="text text_type_main-large pl-0 pr-0 pb-5">
        Лента заказов
      </h1>
      <div className={style.scrollArea}>
        {data.map((el) => (
          <OrderCard key={el._id} data={el} />
        ))}
      </div>
    </section>
  );
}

export default OrdersList;
