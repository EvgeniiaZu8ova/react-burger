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
      const { user, accessToken, refreshToken } = await api.login({
        email,
        password,
      });
      return { user, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async function (refreshToken, { rejectWithValue }) {
    try {
      return await api.logout(refreshToken);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async function (token, { rejectWithValue }) {
    try {
      const { accessToken, refreshToken } = api.refreshToken(token);
      return { accessToken, refreshToken };
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
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    tokenRequest: false,
    tokenFailed: false,
  },
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.registerRequest = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.registerRequest = false;
      state.registerFailed = false;
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    [createUser.rejected]: (state, action) => {
      state.registerRequest = false;
      state.registerFailed = true;
      console.log(action.payload);
    },
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

export default authSlice.reducer;
