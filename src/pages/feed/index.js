import React from "react";

import OrdersList from "../../components/OrdersList";
import OrdersStatus from "../../components/OrdersStatus";

import style from "./feed.module.css";

function FeedPage() {
  return (
    <div className={style.content}>
      <OrdersList isProfile={false} />
      <OrdersStatus />
    </div>
  );
}

export default FeedPage;
