import React from "react";
import PropTypes from "prop-types";

import main from "./Main.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function Main({ ingredients }) {
  return (
    <main className={main.content}>
      <BurgerIngredients data={ingredients} />
      <BurgerConstructor data={ingredients} />
    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default Main;
