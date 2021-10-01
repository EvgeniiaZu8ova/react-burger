import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import OrderCard from "./OrderCard/OrderCard";

import { handleItemSearchWithId } from "../../utils/findItem";
import {
  handleCurrentOrder,
  handleOrderCardModal,
} from "../../services/reducers/orderCardModal";

import data from "../../assets/orders-mock-data.json";

import style from "./OrdersList.module.css";

function OrdersList({ isProfile, onCardClick, path }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const manageOrderCardModal = (isOpen) =>
    dispatch(handleOrderCardModal({ isOpen }));
  const manageCurrentOrder = (order) => dispatch(handleCurrentOrder({ order }));

  function handleOrderCardClick(id) {
    const item = handleItemSearchWithId(data, id);
    console.log(item);

    if (item) {
      manageOrderCardModal(true);
      manageCurrentOrder(item);
    }
  }

  return (
    <section className={`${style.section} ${isProfile && style.section_big}`}>
      {!isProfile && (
        <h1 className="text text_type_main-large pl-0 pr-0 pb-5">
          Лента заказов
        </h1>
      )}
      <div className={style.scrollArea}>
        {data.map((el) => (
          <Link
            key={el._id}
            onClick={() => handleOrderCardClick(el._id)}
            className={style.card}
            to={{
              pathname: `${path}${el._id}`,
              state: { background: location },
            }}
          >
            <OrderCard data={el} isProfile={isProfile} />
          </Link>
        ))}
      </div>
    </section>
  );
}

OrdersList.propTypes = {
  isProfile: PropTypes.bool.isRequired,
  onCardClick: PropTypes.func,
  path: PropTypes.string.isRequired,
};

export default OrdersList;
