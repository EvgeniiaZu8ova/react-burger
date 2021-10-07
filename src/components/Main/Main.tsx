import React, { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import main from "./Main.module.css";

import BurgerConstructor from "../BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients";

const Main: FC = () => {
  return (
    <main className={main.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

export default Main;
