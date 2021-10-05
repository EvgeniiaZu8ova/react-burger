import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  handleIngredientModal,
  handleCurrentIngredient,
} from "../../services/reducers/ingredientModal";

import style from "./BurgerIngredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { handleItemSearchWithId } from "../../utils/findItem";

import IngredientCard from "./IngredientCard/IngredientCard";

function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState("Булки");

  const location = useLocation();
  const dispatch = useDispatch();

  const manageIngredientModal = (isOpen) =>
    dispatch(handleIngredientModal({ isOpen }));
  const manageIngredient = (ingredient) =>
    dispatch(handleCurrentIngredient({ ingredient }));

  const {
    allIngredients: data,
    allIngredientsRequest,
    allIngredientsFailed,
  } = useSelector((store) => store.allIngredients);

  const { chosenBun, chosenOtherItems } = useSelector((store) => store.order);

  function handleTabClick(e) {
    setCurrentTab(e);
  }

  function handleScroll(e) {
    const titles = Array.from(e.target.querySelectorAll("h2"));
    const titlesOnScroll = titles.map((el) => ({
      title: el.innerText,
      top: Math.abs(el.getBoundingClientRect().top - 203),
    }));
    const minTop = Math.min(...titlesOnScroll.map((el) => el.top));
    const closestTitle = titlesOnScroll.find((el) => el.top === minTop).title;
    setCurrentTab(closestTitle);
  }

  function handleIngredientClick(id) {
    const item = handleItemSearchWithId(data, id);

    if (item) {
      manageIngredientModal(true);
      manageIngredient(item);
    }
  }

  return (
    <section className={`${style.section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large pl-0 pr-0 pb-5">
        {allIngredientsRequest
          ? "Загрузка..."
          : allIngredientsFailed
          ? "Что-то пошло не так :("
          : "Соберите бургер"}
      </h1>

      {data && data.length > 0 && (
        <>
          <div style={{ display: "flex" }}>
            <a href="#buns" className={style.link}>
              <Tab
                value="Булки"
                active={currentTab === "Булки"}
                onClick={handleTabClick}
              >
                Булки
              </Tab>
            </a>
            <a href="#sauces" className={style.link}>
              <Tab
                value="Соусы"
                active={currentTab === "Соусы"}
                onClick={handleTabClick}
              >
                Соусы
              </Tab>
            </a>
            <a href="#mains" className={style.link}>
              <Tab
                value="Начинки"
                active={currentTab === "Начинки"}
                onClick={handleTabClick}
              >
                Начинки
              </Tab>
            </a>
          </div>

          <div className={style.scrollArea} onScroll={(e) => handleScroll(e)}>
            <h2 id="buns" className="text text_type_main-medium pt-10 pb-6">
              Булки
            </h2>
            <div className={style.cards__container}>
              {data &&
                data.map(
                  (el, index) =>
                    el.type === "bun" && (
                      <Link
                        key={el._id}
                        onClick={() => handleIngredientClick(el._id)}
                        className={style.card}
                        to={{
                          pathname: `/ingredients/${el._id}`,
                          state: { background: location },
                        }}
                      >
                        <IngredientCard
                          image={el.image_large}
                          price={el.price}
                          name={el.name}
                          quantity={chosenBun.name === el.name ? 2 : 0}
                        />
                      </Link>
                    )
                )}
            </div>
            <h2 id="sauces" className="text text_type_main-medium pt-10 pb-6">
              Соусы
            </h2>
            <div className={style.cards__container}>
              {data &&
                data.map(
                  (el, index) =>
                    el.type === "sauce" && (
                      <Link
                        key={el._id}
                        onClick={() => handleIngredientClick(el._id)}
                        className={style.card}
                        to={{
                          pathname: `/ingredients/${el._id}`,
                          state: { background: location },
                        }}
                      >
                        <IngredientCard
                          image={el.image_large}
                          price={el.price}
                          name={el.name}
                          quantity={
                            chosenOtherItems.filter(
                              (item) => item.name === el.name
                            ).length
                          }
                        />
                      </Link>
                    )
                )}
            </div>
            <h2 id="mains" className="text text_type_main-medium pt-10 pb-6">
              Начинки
            </h2>
            <div className={style.cards__container}>
              {data &&
                data.map(
                  (el, index) =>
                    el.type === "main" && (
                      <Link
                        key={el._id}
                        onClick={() => handleIngredientClick(el._id)}
                        className={style.card}
                        to={{
                          pathname: `/ingredients/${el._id}`,
                          state: { background: location },
                        }}
                      >
                        <IngredientCard
                          image={el.image_large}
                          price={el.price}
                          name={el.name}
                          quantity={
                            chosenOtherItems.filter(
                              (item) => item.name === el.name
                            ).length
                          }
                        />
                      </Link>
                    )
                )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default BurgerIngredients;
