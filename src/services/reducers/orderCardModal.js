import { createSlice } from "@reduxjs/toolkit";

const orderCardModalSlice = createSlice({
  name: "orderCardModal",
  initialState: {
    currentOrder: {},
    isOrderCardModalOpen: false,
  },
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
