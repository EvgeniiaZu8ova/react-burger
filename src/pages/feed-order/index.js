import React from "react";

import OrderInfo from "../../components/OrderInfo/OrderInfo";

import style from "./feed-order.module.css";

function FeedOrderPage() {
  return (
    <div className={style.content}>
      <OrderInfo />
    </div>
  );
}

export default FeedOrderPage;
