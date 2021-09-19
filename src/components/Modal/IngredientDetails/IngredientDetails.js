import React from "react";

import { useSelector } from "react-redux";

import style from "./IngredientDetails.module.css";

function IngredientDetails() {
  const { currentIngredient } = useSelector((store) => store.ingredientModal);
  const { image, name, calories, proteins, fat, carbohydrates } =
    currentIngredient;

  return (
    <div className={style.container}>
      <img src={image} alt={name} className={style.image} />
      <h3 className={`text text_type_main-medium mt-4 mb-8 ${style.title}`}>
        {name}
      </h3>
      <div className={style.info}>
        <div className={style.info__block}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </div>
        <div className={style.info__block}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </div>
        <div className={style.info__block}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </div>
        <div className={style.info__block}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
