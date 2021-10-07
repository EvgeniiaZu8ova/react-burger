import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrdersList from "../../components/OrdersList";
import OrdersStatus from "../../components/OrdersStatus";

import { handleOrderSearchWithId } from "../../utils/findItem.ts";
import {
  handleCurrentOrder,
  handleOrderCardModal,
} from "../../services/reducers/orderCardModal";

import style from "./feed.module.css";

import { getAllOrders } from "../../services/selectors/wsSelectors";
import { WS_CONNECTION_START_ALL_ORDERS } from "../../services/action-types/wsAllOrders";

function FeedPage() {
  const dispatch = useDispatch();
  const allOrders = useSelector(getAllOrders);
  const { orders } = allOrders;

  const manageOrderCardModal = (isOpen) =>
    dispatch(handleOrderCardModal({ isOpen }));
  const manageCurrentOrder = (order) => dispatch(handleCurrentOrder({ order }));

  function handleOrderCardClick(id) {
    const item = handleOrderSearchWithId(orders, id);

    if (item) {
      manageOrderCardModal(true);
      manageCurrentOrder(item);
    }
  }

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_ALL_ORDERS });
  }, [dispatch]);

  return (
    <div className={style.content}>
      <OrdersList
        isProfile={false}
        data={orders}
        onCardClick={handleOrderCardClick}
        path="/feed/"
      />
      <OrdersStatus />
    </div>
  );
}

export default FeedPage;
