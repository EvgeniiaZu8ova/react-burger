import { combineReducers } from "redux";

import allIngredientsReducer from "./allIngredients";
import orderReducer from "./order";
import ingredientModalReducer from "./ingredientModal";
import authReducer from "./auth";
import passwordReducer from "./password";
import orderCardModalReducer from "./orderCardModal";
import myOrderCardModalReducer from "./myOrderCardModal";
import { wsAllOrdersReducer } from "./wsAllOrdersReducer";
import { wsMyOrdersReducer } from "./wsMyOrdersReducer";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  order: orderReducer,
  ingredientModal: ingredientModalReducer,
  auth: authReducer,
  password: passwordReducer,
  orderCardModal: orderCardModalReducer,
  myOrderCardModal: myOrderCardModalReducer,
  allOrders: wsAllOrdersReducer,
  myOrders: wsMyOrdersReducer,
});
