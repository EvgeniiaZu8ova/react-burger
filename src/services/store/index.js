import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../reducers/index";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});

export default store;
