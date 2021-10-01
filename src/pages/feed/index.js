import React from "react";
import { useDispatch } from "react-redux";

import OrdersList from "../../components/OrdersList";
import OrdersStatus from "../../components/OrdersStatus";

import { handleItemSearchWithId } from "../../utils/findItem";
import {
  handleCurrentOrder,
  handleOrderCardModal,
} from "../../services/reducers/orderCardModal";

import data from "../../assets/orders-mock-data.json";

import style from "./feed.module.css";

function FeedPage() {
  // const dispatch = useDispatch();

  // const manageOrderCardModal = (isOpen) =>
  //   dispatch(handleOrderCardModal(isOpen));
  // const manageCurrentOrder = (order) => dispatch(handleCurrentOrder({ order }));

  // function handleOrderCardClick(id) {
  //   const item = handleItemSearchWithId(data, id);

  //   if (item) {
  //     manageOrderCardModal(true);
  //     manageCurrentOrder(item);
  //   }
  // }

  return (
    <div className={style.content}>
      <OrdersList
        isProfile={false}
        // onCardClick={handleOrderCardClick}
        path="/feed/"
      />
      <OrdersStatus />
    </div>
  );
}

export default FeedPage;
