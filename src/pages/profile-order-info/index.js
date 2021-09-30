import React from "react";

import OrderInfo from "../../components/OrderInfo/OrderInfo";

import style from "./profile-order-info.module.css";

function ProfileOrderInfoPage() {
  return (
    <div className={style.content}>
      <OrderInfo />
    </div>
  );
}

export default ProfileOrderInfoPage;
