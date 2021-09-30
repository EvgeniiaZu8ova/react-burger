import React from "react";

import OrdersList from "../../components/OrdersList";

import style from "./feed.module.css";

function FeedPage() {
  return (
    <div className={style.content}>
      <OrdersList isProfile={false} />
    </div>
  );
}

export default FeedPage;
