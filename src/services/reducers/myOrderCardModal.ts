import { createSlice } from "@reduxjs/toolkit";
import { TMyOrderCardModalInitialState } from "../../utils/types";

const initialState: TMyOrderCardModalInitialState = {
  myCurrentOrder: {
    _id: "",
    ingredients: [],
    status: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    number: 0,
  },
  isMyOrderCardModalOpen: false,
};

const myOrderCardModalSlice = createSlice({
  name: "myOrderCardModal",
  initialState,
  reducers: {
    handleMyCurrentOrder(state, action) {
      state.myCurrentOrder = action.payload.order;
    },
    handleMyOrderCardModal(state, action) {
      state.isMyOrderCardModalOpen = action.payload.isOpen;
    },
  },
});

export const { handleMyCurrentOrder, handleMyOrderCardModal } =
  myOrderCardModalSlice.actions;

export default myOrderCardModalSlice.reducer;
