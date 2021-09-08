import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeIngredient } from "../../services/reducers";

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

function BurgerConstructor() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  const {
    chosenBun: bun,
    chosenOtherItems: otherItems,
    finalSum,
  } = useSelector((store) => store.ingredients);

  const dispatch = useDispatch();
  const removeItem = (item) => dispatch(removeIngredient({ item }));

  function handleOrderModalCall() {
    if (Object.keys(bun).length > 0) {
      const myItems = otherItems.map((el) => el._id);
      const myOrder = [...myItems, bun._id, bun._id];

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
  }

  function closeModal() {
    setIsOrderModalOpen(false);
  }

  return (
    <section className={`${style.section} pl-4 pr-2 pt-25`}>
      <div className={style.mainContent}>
        <div className={`${style.burger__container} pr-2`}>
          {Object.keys(bun).length > 0 && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun && bun.name && bun.name.concat(" (верх)")}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}

          <div className={`${style.cards__container} mt-4 mb-4 pr-2`}>
            {otherItems &&
              otherItems.map((el, index) => (
                <article key={index} className={style.card}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                    handleClose={() => {
                      removeItem(el);
                    }}
                  />
                </article>
              ))}
          </div>

          {Object.keys(bun).length > 0 && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun && bun.name && bun.name.concat(" (низ)")}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
      </div>

      {finalSum > 0 && (
        <div className={`${style.order__container} mt-10`}>
          <div className={`${style.order__price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">
              {String(finalSum)}
            </p>
            <img src={bigCurrency} alt="Иконка стоимости" />
          </div>
          <Button type="primary" size="large" onClick={handleOrderModalCall}>
            Оформить заказ
          </Button>
        </div>
      )}

      <Modal isModalOpen={isOrderModalOpen} title="" onClose={closeModal}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;
