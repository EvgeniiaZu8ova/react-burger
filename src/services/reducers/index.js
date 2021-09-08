import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

export const getItems = createAsyncThunk(
  "ingredients/getItems",
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await api.getIngredientsData();
      return { data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    allIngredientsRequest: false,
    allIngredientsFailed: false,
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
  extraReducers: {
    [getItems.pending]: (state, action) => {
      state.allIngredientsRequest = true;
    },
    [getItems.fulfilled]: (state, action) => {
      state.allIngredientsRequest = false;
      state.allIngredientsFailed = false;
      state.allIngredients = action.payload.data;
    },
    [getItems.rejected]: (state, action) => {
      state.allIngredientsRequest = false;
      state.allIngredientsFailed = true;
      console.log(action.payload);
    },
  },
});

export const { addIngredient, removeIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
