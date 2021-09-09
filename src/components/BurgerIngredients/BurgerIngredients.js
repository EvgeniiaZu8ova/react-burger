import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addIngredient,
  handleIngredientModal,
  handleCurrentIngredient,
} from "../../services/reducers";

import style from "./BurgerIngredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { handleItemSearch } from "../../utils/findItem";

import IngredientCard from "./IngredientCard/IngredientCard";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

function BurgerIngredients() {
  const [current, setCurrent] = useState("Булки");

  const dispatch = useDispatch();
  const addItem = (item) => dispatch(addIngredient({ item }));
  const manageIngredientModal = (isOpen) =>
    dispatch(handleIngredientModal(isOpen));
  const manageIngredient = (ingredient) =>
    dispatch(handleCurrentIngredient({ ingredient }));

  const {
    allIngredients: data,
    allIngredientsRequest,
    allIngredientsFailed,
    isIngredientsModalOpen,
  } = useSelector((store) => store.ingredients);

  function handleTabClick(e) {
    setCurrent(e);
  }

  function handleScroll(e) {
    console.log(e.target.querySelectorAll("h2")[0]);
  }

  function handleIngredientClick(e) {
    const parentElement = e.target.parentElement.querySelector(
      ".text_type_main-default"
    );
    const target = parentElement && parentElement.textContent;
    const item = handleItemSearch(data, target);

    if (item) {
      addItem(item);
      manageIngredientModal(true);
      manageIngredient(item);
    }
  }

  function closeModal() {
    manageIngredientModal(false);
    manageIngredient({});
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
          <div className={style.scrollArea} onScroll={(e) => handleScroll(e)}>
            <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
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
            <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
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
            <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
            <div className={style.cards__container}>
              {data &&
                data.map(
                  (el, index) =>
                    el.type === "main" && (
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
        </>
      )}

      <Modal
        isModalOpen={isIngredientsModalOpen}
        title="Детали ингредиента"
        onClose={closeModal}
      >
        {isIngredientsModalOpen && <IngredientDetails />}
      </Modal>
    </section>
  );
}

export default BurgerIngredients;
