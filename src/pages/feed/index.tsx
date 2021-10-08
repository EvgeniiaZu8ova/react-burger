import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import OrdersList from "../../components/OrdersList";
import OrdersStatus from "../../components/OrdersStatus";

import { handleOrderSearchWithId } from "../../utils/findItem";
import { useSelector } from "../../utils/hooks";
import { TOrder } from "../../utils/types";

import {
  handleCurrentOrder,
  handleOrderCardModal,
} from "../../services/reducers/orderCardModal";

import style from "./feed.module.css";

import { getAllOrders } from "../../services/selectors/wsSelectors";
import { WS_CONNECTION_START_ALL_ORDERS } from "../../services/action-types/wsAllOrders";

const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(getAllOrders);
  const { orders } = allOrders;

  const manageOrderCardModal = (isOpen: boolean) =>
    dispatch(handleOrderCardModal({ isOpen }));
  const manageCurrentOrder = (order: TOrder) =>
    dispatch(handleCurrentOrder({ order }));

  function handleOrderCardClick(id: string | undefined) {
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
};

export default FeedPage;
