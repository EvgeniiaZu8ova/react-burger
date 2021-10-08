import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { TOrder } from "../../utils/types";

import OrderCard from "./OrderCard";

import style from "./OrdersList.module.css";

interface OrdersListProps {
  isProfile: boolean;
  data: Array<TOrder>;
  onCardClick: (id: string | undefined) => void;
  path: string;
}

const OrdersList: FC<OrdersListProps> = ({
  isProfile,
  data,
  onCardClick,
  path,
}) => {
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
};

export default OrdersList;
