import React, { useState, useContext } from "react";

import style from "./BurgerConstructor.module.css";

import bigCurrency from "../../images/big-currency-icon.svg";

import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import {
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ConstructorContext from "../../contexts/ConstructorContext";

function BurgerConstructor() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const data = useContext(ConstructorContext);

  function handleOrderModalCall() {
    setIsOrderModalOpen(true);
  }

  function closeModal() {
    setIsOrderModalOpen(false);
  }

  return (
    <section className={`${style.section} pl-4 pr-2 pt-25`}>
      {data.length > 0 && (
        <>
          <div className={style.mainContent}>
            <div className={`${style.burger__container} pr-2`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={data[0].name.concat(" (верх)")}
                price={data[0].price}
                thumbnail={data[0].image}
              />

              <div className={`${style.cards__container} mt-4 mb-4 pr-2`}>
                {data.map(
                  (el, index) =>
                    index > 0 &&
                    index < data.length - 2 && (
                      <article key={el._id} className={style.card}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                          text={el.name}
                          price={el.price}
                          thumbnail={el.image}
                        />
                      </article>
                    )
                )}
              </div>

              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={data[0].name.concat(" (низ)")}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </div>
          </div>

          <div className={`${style.order__container} mt-10`}>
            <div className={`${style.order__price} mr-10`}>
              <p className="text text_type_digits-medium mr-2">
                {data.reduce((acc, curr) => acc + curr.price, 0)}
              </p>
              <img src={bigCurrency} alt="Иконка стоимости" />
            </div>
            <Button type="primary" size="large" onClick={handleOrderModalCall}>
              Оформить заказ
            </Button>
          </div>
        </>
      )}
      <Modal isModalOpen={isOrderModalOpen} title="" onClose={closeModal}>
        <OrderDetails />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;
