import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

export const getItems = createAsyncThunk(
  "allIngredients/getItems",
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await api.getIngredientsData();
      return { data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const allIngredientsSlice = createSlice({
  name: "allIngredients",
  initialState: {
    allIngredients: [],
    allIngredientsRequest: false,
    allIngredientsFailed: false,
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

export default allIngredientsSlice.reducer;
