import { combineReducers } from "redux";

import allIngredientsReducer from "./allIngredients";
import orderReducer from "./order";
import ingredientModalReducer from "./ingredientModal";
import authReducer from "./auth";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  order: orderReducer,
  ingredientModal: ingredientModalReducer,
  auth: authReducer,
});
