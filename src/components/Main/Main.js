import React, { Component } from "react";

import main from "./Main.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

class Main extends Component {
  render() {
    return (
      <main className={main.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    );
  }
}

export default Main;
