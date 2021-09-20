import { combineReducers } from "redux";

import allIngredientsReducer from "./allIngredients";
import orderReducer from "./order";
import ingredientModalReducer from "./ingredientModal";
import registerReducer from "./register";
import loginReducer from "./login";
import logoutReducer from "./logout";
import tokenReducer from "./token";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  order: orderReducer,
  ingredientModal: ingredientModalReducer,
  register: registerReducer,
  login: loginReducer,
  logout: logoutReducer,
  token: tokenReducer,
});
