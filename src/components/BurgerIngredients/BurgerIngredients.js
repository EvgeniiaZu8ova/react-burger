import React, { useState } from "react";

import style from "./BurgerIngredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientCard from "./IngredientCard/IngredientCard";

function BurgerIngredients({ data, forModalClick }) {
  const [current, setCurrent] = useState("Булки");

  const handleTabClick = (e) => setCurrent(e);

  const handleIngredientClick = (e) => {
    const target =
      e.target.parentElement.querySelector(".text_type_main-default")
        .textContent || null;
    forModalClick(target);
  };

  return (
    <section className={`${style.section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large pl-0 pr-0 pb-5">
        Соберите бургер
      </h1>
      <div style={{ display: "flex" }} className="pb-10">
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={handleTabClick}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={style.scrollArea}>
        <h2 className="text text_type_main-medium pb-6">Булки</h2>
        <div className={style.cards__container}>
          {data &&
            data.map(
              (el, index) =>
                el.type === "bun" && (
                  <div
                    key={el._id}
                    className={style.card}
                    onClick={handleIngredientClick}
                  >
                    <IngredientCard
                      image={el.image_large}
                      price={el.price}
                      name={el.name}
                    />
                  </div>
                )
            )}
        </div>
        <h2 className="text text_type_main-medium pb-6">Соусы</h2>
        <div className={style.cards__container}>
          {data &&
            data.map(
              (el, index) =>
                el.type === "sauce" && (
                  <div
                    key={el._id}
                    className={style.card}
                    onClick={handleIngredientClick}
                  >
                    <IngredientCard
                      image={el.image_large}
                      price={el.price}
                      name={el.name}
                    />
                  </div>
                )
            )}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
