import React from "react";

import main from "./Main.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function Main(props) {
  return (
    <main className={main.content}>
      <BurgerConstructor />
      <BurgerIngredients />
    </main>
  );
}

export default Main;
