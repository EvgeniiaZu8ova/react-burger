import { createSlice } from "@reduxjs/toolkit";
import { TOrderCardModalInitialState } from "../../utils/types";

const initialState: TOrderCardModalInitialState = {
  currentOrder: {
    _id: "",
    ingredients: [],
    status: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    number: 0,
  },
  isOrderCardModalOpen: false,
};

const orderCardModalSlice = createSlice({
  name: "orderCardModal",
  initialState,
  reducers: {
    handleCurrentOrder(state, action) {
      state.currentOrder = action.payload.order;
    },
    handleOrderCardModal(state, action) {
      state.isOrderCardModalOpen = action.payload.isOpen;
    },
  },
});

export const { handleCurrentOrder, handleOrderCardModal } =
  orderCardModalSlice.actions;

export default orderCardModalSlice.reducer;
