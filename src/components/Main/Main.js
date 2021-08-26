import React from "react";

import main from "./Main.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function Main({ ingredients, forModalClick }) {
  return (
    <main className={main.content}>
      <BurgerIngredients data={ingredients} forModalClick={forModalClick} />
      <BurgerConstructor data={ingredients} forModalClick={forModalClick} />
    </main>
  );
}

export default Main;
