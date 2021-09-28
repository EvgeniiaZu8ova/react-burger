import { combineReducers } from "redux";

import allIngredientsReducer from "./allIngredients";
import orderReducer from "./order";
import ingredientModalReducer from "./ingredientModal";
import authReducer from "./auth";
import passwordReducer from "./password";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  order: orderReducer,
  ingredientModal: ingredientModalReducer,
  auth: authReducer,
  password: passwordReducer,
});
