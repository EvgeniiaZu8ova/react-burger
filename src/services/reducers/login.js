import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

export const signIn = createAsyncThunk(
  "login/signIn",
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const { user } = await api.login({ email, password });
      return { user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    name: "",
    email: "",
    accessToken: "",
    refreshToken: "",
    loginRequest: false,
    loginFailed: false,
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {
      state.loginRequest = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loginRequest = false;
      state.loginFailed = false;
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    [signIn.rejected]: (state, action) => {
      state.loginRequest = false;
      state.loginFailed = true;
      console.log(action.payload);
    },
  },
});

export default loginSlice.reducer;
