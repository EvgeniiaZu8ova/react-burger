import React from "react";
import { useDispatch } from "react-redux";

import OrdersList from "../../components/OrdersList";
import ProfileNav from "../../components/Profile/ProfileNav";

import { handleItemSearchWithId } from "../../utils/findItem";
import {
  handleMyCurrentOrder,
  handleMyOrderCardModal,
} from "../../services/reducers/myOrderCardModal";

import data from "../../assets/orders-mock-data.json";

import style from "./profile-orders.module.css";

function ProfileOrdersPage() {
  const dispatch = useDispatch();

  const manageMyOrderCardModal = (isOpen) =>
    dispatch(handleMyOrderCardModal(isOpen));
  const manageMyCurrentOrder = (order) =>
    dispatch(handleMyCurrentOrder({ order }));

  function handleMyOrderCardClick(id) {
    const item = handleItemSearchWithId(data, id);

    if (item) {
      manageMyOrderCardModal(true);
      manageMyCurrentOrder(item);
    }
  }

  return (
    <section className={style.profile}>
      <div style={{ marginTop: "80px" }}>
        <ProfileNav />
      </div>
      <OrdersList
        isProfile={true}
        onCardClick={handleMyOrderCardClick}
        path="/profile/orders/"
      />
    </section>
  );
}

export default ProfileOrdersPage;
