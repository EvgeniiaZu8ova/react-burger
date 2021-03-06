import React, { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";

import { getCookie } from "../../utils/cookie";
import { refreshToken } from "../../services/reducers/auth";
import { useSelector } from "../../utils/hooks";
import { TIngredient } from "../../utils/types";

import {
  addIngredient,
  removeIngredient,
  sendOrder,
  handleOrderModal,
} from "../../services/reducers/order";

import { handleItemSearchWithName } from "../../utils/findItem";

import style from "./BurgerConstructor.module.css";

import bigCurrency from "../../images/big-currency-icon.svg";

import OrderDetails from "../Modal/OrderDetails";
import Modal from "../Modal";

import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NotBunItem from "./NotBunItem";

const BurgerConstructor: FC = () => {
  const history = useHistory();

  const isTokenExpired = localStorage.getItem("isTokenExpired");

  const token = getCookie("accessToken");
  const tokenRefresh = getCookie("refreshToken");
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
    const bunPrice = bun.price * 2;
    const otherItemsPrice = otherItems.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    return bunPrice + otherItemsPrice;
  }, [bun, otherItems]);

  const dispatch = useDispatch();
  const addItem = (item: TIngredient) => dispatch(addIngredient({ item }));
  const removeItem = (item: TIngredient) =>
    dispatch(removeIngredient({ item }));
  const makeOrder = ({
    accessToken,
    myOrder,
  }: {
    accessToken: string;
    myOrder: (string | undefined)[];
  }) => dispatch(sendOrder({ accessToken, myOrder }));
  const manageOrderModal = (isOpen: boolean) =>
    dispatch(handleOrderModal(isOpen));

  function handleAddItem(name: string) {
    const item = handleItemSearchWithName(data, name);

    if (item) {
      addItem(item);
    }
  }

  const [{ isHover }, dropCard] = useDrop({
    accept: "card",
    drop({ name }: { name: string }) {
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
      dispatch(refreshToken(tokenRefresh));
    }
  }

  function closeModal() {
    manageOrderModal(false);
  }

  return (
    <section
      id="constructor"
      ref={dropCard}
      className={`${style.section} pl-4 pr-2 pt-25`}
    >
      <div className={style.mainContent}>
        <div className={`${style.burger__container} pr-2`}>
          {bun.name.length > 0 && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun && bun.name && bun.name.concat(" (????????)")}
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

          {bun.name.length > 0 && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun && bun.name && bun.name.concat(" (??????)")}
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
            <img src={bigCurrency} alt="???????????? ??????????????????" />
          </div>
          <Button type="primary" size="large" onClick={handleOrderModalCall}>
            {orderRequest
              ? "????????????????????..."
              : orderFailed
              ? "??????-???? ?????????? ???? ?????? :("
              : bun.name
              ? "???????????????? ??????????"
              : "???????????????????? ???????????????? ??????????!"}
          </Button>
        </div>
      )}

      <Modal isModalOpen={isOrderModalOpen} title="" onClose={closeModal}>
        <OrderDetails orderNumber={orderObject.number} />
      </Modal>
    </section>
  );
};

export default BurgerConstructor;
