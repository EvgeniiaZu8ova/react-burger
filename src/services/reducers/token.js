import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

export const refreshToken = createAsyncThunk(
  "token/refreshToken",
  async function (token, { rejectWithValue }) {
    try {
      const { accessToken, refreshToken } = api.refreshToken(token);
      return { accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    tokenRequest: false,
    tokenFailed: false,
    accessToken: "",
    refreshToken: "",
  },
  extraReducers: {
    [refreshToken.pending]: (state, action) => {
      state.tokenRequest = true;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.tokenRequest = false;
      state.tokenFailed = false;
    },
    [refreshToken.rejected]: (state, action) => {
      state.tokenRequest = false;
      state.tokenFailed = true;
      console.log(action.payload);
    },
  },
});

export default tokenSlice.reducer;
