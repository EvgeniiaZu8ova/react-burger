import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import OrderInfo from "../../components/OrderInfo/OrderInfo";
import { WS_CONNECTION_START_ALL_ORDERS } from "../../services/action-types/wsAllOrders";

import style from "./feed-order.module.css";

function FeedOrderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_ALL_ORDERS });
  }, [dispatch]);

  return (
    <div className={style.content}>
      <OrderInfo />
    </div>
  );
}

export default FeedOrderPage;
