import React from "react";

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

export default Main;
