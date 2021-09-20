import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

export const createUser = createAsyncThunk(
  "auth/createUser",
  async function ({ email, password, name }, { rejectWithValue }) {
    try {
      const { user, accessToken, refreshToken } = await api.register({
        email,
        password,
        name,
      });
      return { user, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const { user } = await api.login({ email, password });
      return { user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: "",
    accessToken: "",
    refreshToken: "",
    authRequest: false,
    authFailed: false,
  },
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.authRequest = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.authRequest = false;
      state.authFailed = false;
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    [createUser.rejected]: (state, action) => {
      state.authRequest = false;
      state.authFailed = true;
      console.log(action.payload);
    },
    [signIn.pending]: (state, action) => {
      state.authRequest = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.authRequest = false;
      state.authFailed = false;
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    [signIn.rejected]: (state, action) => {
      state.authRequest = false;
      state.authFailed = true;
      console.log(action.payload);
    },
  },
});

export default authSlice.reducer;
