import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import OrderInfo from "../../components/OrderInfo";
import { WS_CONNECTION_START_MY_ORDERS } from "../../services/action-types/wsMyOrders";

import style from "./profile-order-info.module.css";

const ProfileOrderInfoPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_MY_ORDERS });
  }, [dispatch]);

  return (
    <div className={style.content}>
      <OrderInfo />
    </div>
  );
};

export default ProfileOrderInfoPage;
