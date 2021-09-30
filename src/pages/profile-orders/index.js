import React from "react";

import OrdersList from "../../components/OrdersList";

import style from "./profile-orders.module.css";

function ProfileOrdersPage() {
  return (
    <div className={style.content}>
      <OrdersList />
    </div>
  );
}

export default ProfileOrdersPage;
