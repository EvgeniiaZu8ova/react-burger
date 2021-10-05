import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import OrderCard from "./OrderCard/OrderCard";

import style from "./OrdersList.module.css";

function OrdersList({ isProfile, data, onCardClick, path }) {
  const location = useLocation();

  return (
    <section className={`${style.section} ${isProfile && style.section_big}`}>
      {!isProfile && (
        <h1 className="text text_type_main-large pl-0 pr-0 pb-5">
          Лента заказов
        </h1>
      )}
      <div className={style.scrollArea}>
        {data &&
          data.map((el) => (
            <Link
              key={el._id}
              onClick={() => onCardClick(el._id)}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      ingredients: PropTypes.array,
      status: PropTypes.string,
      name: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      number: PropTypes.number,
    })
  ),
  onCardClick: PropTypes.func,
  path: PropTypes.string.isRequired,
};

export default OrdersList;
