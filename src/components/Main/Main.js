import React from "react";

import main from "./Main.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function Main() {
  return (
    <main className={main.content}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default Main;
