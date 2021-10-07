import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrdersList from "../../components/OrdersList";
import ProfileNav from "../../components/Profile/ProfileNav";

import { handleOrderSearchWithId } from "../../utils/findItem.ts";
import {
  handleMyCurrentOrder,
  handleMyOrderCardModal,
} from "../../services/reducers/myOrderCardModal";

import style from "./profile-orders.module.css";

import { getMyOrders } from "../../services/selectors/wsSelectors";
import { WS_CONNECTION_START_MY_ORDERS } from "../../services/action-types/wsMyOrders";

function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const myOrders = useSelector(getMyOrders);
  const { orders } = myOrders;

  const manageMyOrderCardModal = (isOpen) =>
    dispatch(handleMyOrderCardModal({ isOpen }));
  const manageMyCurrentOrder = (order) =>
    dispatch(handleMyCurrentOrder({ order }));

  function handleMyOrderCardClick(id) {
    const item = handleOrderSearchWithId(orders, id);

    if (item) {
      manageMyOrderCardModal(true);
      manageMyCurrentOrder(item);
    }
  }

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_MY_ORDERS });
  }, [dispatch]);

  return (
    <section className={style.profile}>
      <div style={{ marginTop: "80px" }}>
        <ProfileNav />
      </div>
      <OrdersList
        isProfile={true}
        data={orders}
        onCardClick={handleMyOrderCardClick}
        path="/profile/orders/"
      />
    </section>
  );
}

export default ProfileOrdersPage;
