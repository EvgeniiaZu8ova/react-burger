import React, { Component } from "react";

import style from "./BurgerConstructor.module.css";

import data from "../../utils/data";

import bigCurrency from "../../images/big-currency-icon.svg";

import {
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerConstructor extends Component {
  render() {
    return (
      <section className={`${style.section} pl-4 pr-2 pt-25`}>
        <div className={`${style.mainContent} pr-2`}>
          <div className={style.icons__container}>
            {data.map(
              (el, index) =>
                index > 0 && index < data.length - 1 && <DragIcon key={index} />
            )}
          </div>
          <div className={style.cards__container}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={data[0].name}
              price={data[0].price}
              thumbnail={data[0].image}
            />
            {data.map(
              (el, index) =>
                index > 0 &&
                index < data.length - 1 && (
                  <ConstructorElement
                    key={index}
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                  />
                )
            )}

            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={data[data.length - 1].name}
              price={data[data.length - 1].price}
              thumbnail={data[data.length - 1].image}
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
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;
