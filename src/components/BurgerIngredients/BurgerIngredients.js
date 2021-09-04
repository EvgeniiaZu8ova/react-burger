import React, { useState } from "react";
import PropTypes from "prop-types";

import style from "./BurgerIngredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { handleItemSearch } from "../../utils/findItem";

import IngredientCard from "./IngredientCard/IngredientCard";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

function BurgerIngredients({ data, itemsDispatcher }) {
  const [current, setCurrent] = useState("Булки");
  const [isIngredientsModalOpen, setIsIngredientsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  function handleTabClick(e) {
    setCurrent(e);
  }

  function handleIngredientClick(e) {
    const parentElement = e.target.parentElement.querySelector(
      ".text_type_main-default"
    );

    const target = parentElement && parentElement.textContent;

    if (target) {
      itemsDispatcher({ type: "add", payload: target });
    }

    const item = handleItemSearch(data, target);

    if (item) {
      setSelectedIngredient(item);
      setIsIngredientsModalOpen(true);
    }
  }

  function closeModal() {
    setIsIngredientsModalOpen(false);
    setSelectedIngredient({});
  }

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
      <Modal
        isModalOpen={isIngredientsModalOpen}
        title="Детали ингредиента"
        onClose={closeModal}
      >
        {isIngredientsModalOpen && (
          <IngredientDetails item={selectedIngredient} />
        )}
      </Modal>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
  itemsDispatcher: PropTypes.func.isRequired,
};

export default BurgerIngredients;
