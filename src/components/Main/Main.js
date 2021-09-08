import React from "react";

import { useSelector } from "react-redux";

import main from "./Main.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function Main() {
  const ingredients = useSelector((store) => store.ingredients.allIngredients);

  return (
    <main className={main.content}>
      <BurgerIngredients data={ingredients} />
      <BurgerConstructor />
    </main>
  );
}

export default Main;
