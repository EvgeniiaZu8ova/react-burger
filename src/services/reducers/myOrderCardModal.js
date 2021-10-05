import { createSlice } from "@reduxjs/toolkit";

const myOrderCardModalSlice = createSlice({
  name: "myOrderCardModal",
  initialState: {
    myCurrentOrder: {},
    isMyOrderCardModalOpen: false,
  },
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
