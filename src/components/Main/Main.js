import React from "react";
import PropTypes from "prop-types";

import main from "./Main.module.css";

import ConstructorContext from "../../contexts/ConstructorContext";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function Main({ ingredients }) {
  return (
    <main className={main.content}>
      <BurgerIngredients data={ingredients} />
      <ConstructorContext.Provider value={ingredients}>
        <BurgerConstructor />
      </ConstructorContext.Provider>
    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default Main;
