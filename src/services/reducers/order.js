import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async function ({ accessToken, myOrder }, { rejectWithValue }) {
    try {
      const { order } = await api.makeOrder(accessToken, myOrder);
      return { order };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    chosenBun: {},
    chosenOtherItems: [],
    orderObject: {},
    orderRequest: false,
    orderFailed: false,
    isOrderModalOpen: false,
  },
  reducers: {
    addIngredient(state, action) {
      if (action.payload.item.type === "bun") {
        state.chosenBun = action.payload.item;
      } else {
        state.chosenOtherItems.push(action.payload.item);
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
      }
    },
    moveIngredients(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const dragItem = state.chosenOtherItems[dragIndex];
      const newItems = [...state.chosenOtherItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);

      state.chosenOtherItems = newItems;
    },
    handleOrderModal(state, action) {
      state.isOrderModalOpen = action.payload;
    },
  },
  extraReducers: {
    [sendOrder.pending]: (state, action) => {
      state.orderRequest = true;
    },
    [sendOrder.fulfilled]: (state, action) => {
      state.orderRequest = false;
      state.orderFailed = false;
      state.orderObject = action.payload.order;
      state.isOrderModalOpen = true;
      state.chosenBun = {};
      state.chosenOtherItems = [];
    },
    [sendOrder.rejected]: (state, action) => {
      state.orderRequest = false;
      state.orderFailed = true;
      console.log(action.payload);
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredients,
  handleOrderModal,
} = orderSlice.actions;

export default orderSlice.reducer;
