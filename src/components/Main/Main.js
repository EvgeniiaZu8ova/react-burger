import React, { useReducer } from "react";
import PropTypes from "prop-types";

import main from "./Main.module.css";

import ConstructorContext from "../../contexts/ConstructorContext";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

import { handleItemSearch } from "../../utils/findItem";

function Main({ ingredients }) {
  const itemsInitialState = { bun: {}, otherItems: [], finalSum: 0 };

  function reducer(state, action) {
    const item = handleItemSearch(ingredients, action.payload);

    switch (action.type) {
      case "add":
        if (item) {
          if (item.type === "bun") {
            const bunPrevPrice = state.bun.price || 0;
            return {
              ...state,
              bun: item,
              finalSum: state.finalSum - 2 * bunPrevPrice + 2 * item.price,
            };
          } else {
            return {
              ...state,
              otherItems: [...state.otherItems, item],
              finalSum: state.finalSum + item.price,
            };
          }
        }
        break;
      case "remove":
        if (item && item.type !== "bun") {
          return {
            ...state,
            otherItems: state.otherItems.filter(
              (el, index, arr) => index !== arr.indexOf(item)
            ),
            finalSum: state.finalSum - item.price,
          };
        }
        break;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [itemsState, itemsDispatcher] = useReducer(
    reducer,
    itemsInitialState,
    undefined
  );

  return (
    <main className={main.content}>
      <BurgerIngredients data={ingredients} itemsDispatcher={itemsDispatcher} />
      <ConstructorContext.Provider value={{ itemsState, itemsDispatcher }}>
        <BurgerConstructor />
      </ConstructorContext.Provider>
    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Main;
