import React from "react";

import OrdersList from "../../components/OrdersList";
import ProfileNav from "../../components/Profile/ProfileNav";

import style from "./profile-orders.module.css";

function ProfileOrdersPage() {
  return (
    <section className={style.profile}>
      <div style={{ marginTop: "80px" }}>
        <ProfileNav />
      </div>
      <OrdersList isProfile={true} />
    </section>
  );
}

export default ProfileOrdersPage;
