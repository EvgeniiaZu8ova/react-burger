import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

export const signOut = createAsyncThunk(
  "logout/signOut",
  async function (refreshToken, { rejectWithValue }) {
    try {
      return await api.logout(refreshToken);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    logoutRequest: false,
    logoutFailed: false,
  },
  extraReducers: {
    [signOut.pending]: (state, action) => {
      state.logoutRequest = true;
    },
    [signOut.fulfilled]: (state, action) => {
      state.logoutRequest = false;
      state.logoutFailed = false;
    },
    [signOut.rejected]: (state, action) => {
      state.logoutRequest = false;
      state.logoutFailed = true;
      console.log(action.payload);
    },
  },
});

export default logoutSlice.reducer;
