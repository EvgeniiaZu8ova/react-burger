import React, { useContext } from "react";

import style from "./OrderDetails.module.css";

import done from "../../../images/done-icon.svg";

import ConstructorContext from "../../../contexts/ConstructorContext";

function OrderDetails() {
  const data = useContext(ConstructorContext);

  return (
    <div className={style.container}>
      <h2 className={`text text_type_digits-large mt-4 mb-8 ${style.title}`}>
        {data.reduce((acc, curr) => acc + curr.price, 0)}
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={done} alt="Готово" className={style.icon} />
      <p className="text text_type_main-small mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
