import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

// export const getItems = createAsyncThunk(
//   "ingredients/getItems",
//   api
//     .getIngredientsData()
//     .then((res) => {
//       const { data } = res;
//       return data;
//     })
//     .catch((err) => {
//       console.log("Ошибка при загрузке данных об ингредиентах", err.message);
//     })
// );

// export const sendOrder = createAsyncThunk(
//   "ingredients/sendOrder",
//   api
//     .makeOrder()
//     .then((res) => {
//       return res.order.number;
//     })
//     .catch((err) => {
//       console.log("Ошибка при попытке оформить заказ", err.message);
//     })
// );

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    allIngredients: [],
    chosenBun: {},
    chosenOtherItems: [],
    finalSum: 0,
    currentIngredient: {},
    orderObject: {},
    isOrderSuccess: false,
  },
  reducers: {
    addIngredient(state, action) {
      if (action.payload.item.type === "bun") {
        const bunPrevPrice = state.chosenBun.price || 0;
        state.chosenBun = action.payload.item;
        state.finalSum =
          state.finalSum - 2 * bunPrevPrice + 2 * action.payload.item.price;
      } else {
        state.chosenOtherItems.push(action.payload.item);
        state.finalSum = state.finalSum + action.payload.item.price;
      }
    },
    removeIngredient(state, action) {
      if (action.payload.item.type !== "bun") {
        const deletedItem = state.chosenOtherItems.find(
          (el) => el.name === action.payload.item.name
        );
        state.chosenOtherItems = state.chosenOtherItems.filter(
          (el, index, arr) => index !== arr.indexOf(deletedItem)
        );
        state.finalSum = state.finalSum - action.payload.item.price;
      }
    },
  },
  // extraReducers: {},
});

export const { addIngredient, removeIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
