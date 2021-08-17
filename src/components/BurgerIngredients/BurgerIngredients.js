import React, { Component } from "react";

import style from "./BurgerIngredients.module.css";

import data from "../../utils/data";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientCard from "./IngredientCard/IngredientCard";
class BurgerIngredients extends Component {
  state = { current: "Булки" };

  handleTabClick = () => {
    this.setState((prevState) => ({
      ...prevState,
      current: () => {
        return prevState === "Булки"
          ? "Соусы"
          : prevState === "Соусы"
          ? "Начинки"
          : "Булки";
      },
    }));
  };

  render() {
    return (
      <section className={`${style.section} pt-10 pb-10`}>
        <h1 className="text text_type_main-large pl-0 pr-0 pb-5">
          Соберите бургер
        </h1>
        <div style={{ display: "flex" }} className="pb-10">
          <Tab
            value="Булки"
            active={this.state.current === "Булки"}
            onClick={this.handleTabClick}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={this.state.current === "Соусы"}
            onClick={this.handleTabClick}
          >
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={this.state.current === "Начинки"}
            onClick={this.handleTabClick}
          >
            Начинки
          </Tab>
        </div>
        <div className={style.scrollArea}>
          <h2 className="text text_type_main-medium pb-6">Булки</h2>
          <div className={style.cards__container}>
            {data.map(
              (el, index) =>
                el.type === "bun" && (
                  <IngredientCard
                    key={index}
                    image={el.image_large}
                    price={el.price}
                    name={el.name}
                  />
                )
            )}
          </div>
          <h2 className="text text_type_main-medium pb-6">Соусы</h2>
          <div className={style.cards__container}>
            {data.map(
              (el, index) =>
                el.type === "sauce" && (
                  <IngredientCard
                    key={index}
                    image={el.image_large}
                    price={el.price}
                    name={el.name}
                  />
                )
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;
