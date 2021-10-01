import { createSlice } from "@reduxjs/toolkit";

const ingredientModalSlice = createSlice({
  name: "ingredientModal",
  initialState: {
    currentIngredient: {},
    isIngredientsModalOpen: false,
  },
  reducers: {
    handleCurrentIngredient(state, action) {
      state.currentIngredient = action.payload.ingredient;
    },
    handleIngredientModal(state, action) {
      state.isIngredientsModalOpen = action.payload.isOpen;
    },
  },
});

export const { handleCurrentIngredient, handleIngredientModal } =
  ingredientModalSlice.actions;

export default ingredientModalSlice.reducer;
