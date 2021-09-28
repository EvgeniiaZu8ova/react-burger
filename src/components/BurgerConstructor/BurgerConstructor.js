import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";

import { getCookie } from "../../utils/cookie";

import {
  addIngredient,
  removeIngredient,
  sendOrder,
  handleOrderModal,
} from "../../services/reducers/order";

import { handleItemSearch } from "../../utils/findItem";

import style from "./BurgerConstructor.module.css";

import bigCurrency from "../../images/big-currency-icon.svg";

import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NotBunItem from "./NotBunItem/NotBunItem";

function BurgerConstructor() {
  const history = useHistory();

  const isTokenExpired = JSON.parse(localStorage.getItem("isTokenExpired"));
  const token = getCookie("accessToken");
  const { allIngredients: data } = useSelector((store) => store.allIngredients);

  const {
    chosenBun: bun,
    chosenOtherItems: otherItems,
    orderObject,
    isOrderModalOpen,
    orderRequest,
    orderFailed,
  } = useSelector((store) => store.order);

  const finalSum = useMemo(() => {
    const bunPrice = bun.price * 2 || 0;
    const otherItemsPrice = otherItems.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    return bunPrice + otherItemsPrice;
  }, [bun, otherItems]);

  const dispatch = useDispatch();
  const addItem = (item) => dispatch(addIngredient({ item }));
  const removeItem = (item) => dispatch(removeIngredient({ item }));
  const makeOrder = ({ accessToken, myOrder }) =>
    dispatch(sendOrder({ accessToken, myOrder }));
  const manageOrderModal = (isOpen) => dispatch(handleOrderModal(isOpen));

  function handleAddItem(name) {
    const item = handleItemSearch(data, name);

    if (item) {
      addItem(item);
    }
  }

  const [{ isHover }, dropCard] = useDrop({
    accept: "card",
    drop({ name }) {
      handleAddItem(name);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  function handleOrderModalCall() {
    if (!token) {
      history.push("/login");
    } else if (Object.keys(bun).length > 0 && isTokenExpired === null) {
      const myItems = otherItems.map((el) => el._id);
      const myOrder = [...myItems, bun._id, bun._id];
      makeOrder({ accessToken: token, myOrder: myOrder });
    } else {
      return token;
    }
  }

  function closeModal() {
    manageOrderModal(false);
  }

  return (
    <section ref={dropCard} className={`${style.section} pl-4 pr-2 pt-25`}>
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
                <NotBunItem
                  key={index}
                  index={index}
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                  handleClose={() => {
                    removeItem(el);
                  }}
                  isHover={isHover}
                />
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
            {orderRequest
              ? "Отправляем..."
              : orderFailed
              ? "Что-то пошло не так :("
              : bun.name
              ? "Оформить заказ"
              : "Необходимо добавить булку!"}
          </Button>
        </div>
      )}

      <Modal isModalOpen={isOrderModalOpen} title="" onClose={closeModal}>
        <OrderDetails orderNumber={orderObject.number} />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;
