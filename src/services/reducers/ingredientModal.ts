import { createSlice } from "@reduxjs/toolkit";
import { TIngredientModalInitialState } from "../../utils/types";

const initialState: TIngredientModalInitialState = {
  currentIngredient: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
  isIngredientsModalOpen: false,
};

const ingredientModalSlice = createSlice({
  name: "ingredientModal",
  initialState,
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
