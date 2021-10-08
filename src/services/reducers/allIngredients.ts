import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";
import {
  TAllIngredientsResponse,
  TIngredientsInitialState,
} from "../../utils/types";

export const getItems = createAsyncThunk(
  "allIngredients/getItems",
  async (): Promise<TAllIngredientsResponse | undefined> => {
    try {
      const response = await api.getIngredientsData();
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

const initialState: TIngredientsInitialState = {
  allIngredients: [],
  allIngredientsRequest: false,
  allIngredientsFailed: false,
};

const allIngredientsSlice = createSlice({
  name: "allIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state, { payload }) => {
      state.allIngredientsRequest = true;
    });
    builder.addCase(getItems.fulfilled, (state, { payload }) => {
      state.allIngredientsRequest = false;
      state.allIngredientsFailed = false;
      state.allIngredients = payload ? payload.data : state.allIngredients;
    });
    builder.addCase(getItems.rejected, (state, action) => {
      state.allIngredientsRequest = false;
      state.allIngredientsFailed = true;
    });
  },
});

export default allIngredientsSlice.reducer;
