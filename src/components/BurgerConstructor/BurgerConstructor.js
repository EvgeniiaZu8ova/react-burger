import React, { useState, useContext } from "react";

import style from "./BurgerConstructor.module.css";

import bigCurrency from "../../images/big-currency-icon.svg";

import api from "../../utils/Api";

import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import {
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ConstructorContext from "../../contexts/ConstructorContext";

import handleConstructorRender from "../../utils/handleConstructorRender";

function BurgerConstructor() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  const data = useContext(ConstructorContext);
  const { findBun, removeBuns, calcFinalSum } = handleConstructorRender();

  const bun = findBun(data);
  const otherItems = removeBuns(data);

  function handleOrderModalCall() {
    const myOrder = data.map((el) => el._id);

    api
      .makeOrder(myOrder)
      .then((res) => {
        setOrderNumber(res.order.number);
      })
      .then(() => {
        setIsOrderModalOpen(true);
      })
      .catch((err) => {
        console.log("Ошибка при попытке оформить заказ", err.message);
      });
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
                text={bun && bun.name.concat(" (верх)")}
                price={bun && bun.price}
                thumbnail={bun && bun.image}
              />

              <div className={`${style.cards__container} mt-4 mb-4 pr-2`}>
                {otherItems &&
                  otherItems.map((el, index) => (
                    <article key={el._id} className={style.card}>
                      <DragIcon type="primary" />
                      <ConstructorElement
                        text={el.name}
                        price={el.price}
                        thumbnail={el.image}
                      />
                    </article>
                  ))}
              </div>

              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun && bun.name.concat(" (низ)")}
                price={bun && bun.price}
                thumbnail={bun && bun.image}
              />
            </div>
          </div>

          <div className={`${style.order__container} mt-10`}>
            <div className={`${style.order__price} mr-10`}>
              <p className="text text_type_digits-medium mr-2">
                {data && String(calcFinalSum(data))}
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
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;
