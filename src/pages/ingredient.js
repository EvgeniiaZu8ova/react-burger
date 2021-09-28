import React from "react";

import IngredientDetails from "../components/Modal/IngredientDetails/IngredientDetails";

import style from "./ingredient.module.css";

function IngredientPage() {
  return (
    <section className={style.page}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <IngredientDetails />
    </section>
  );
}

export default IngredientPage;
