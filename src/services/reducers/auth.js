import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";
import { setCookie, deleteCookie } from "../../utils/cookie";

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
      setCookie("refreshToken", refreshToken);
      setCookie("accessToken", accessToken);
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
      const res = await api.logout(refreshToken);
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
      localStorage.removeItem("isTokenExpired");
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async function (token, { rejectWithValue }) {
    try {
      const { accessToken, refreshToken } = await api.refreshToken(token);
      setCookie("refreshToken", refreshToken);
      setCookie("accessToken", accessToken);
      localStorage.setItem("isTokenExpired", false);
      return { accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async function (accessToken, { rejectWithValue }) {
    try {
      const res = await api.getUserInfo(accessToken);
      const { user } = res;
      return { user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async function ({ accessToken, name, email }, { rejectWithValue }) {
    try {
      const { user } = await api.updateUserInfo({ accessToken, name, email });
      return { user };
    } catch (error) {
      return rejectWithValue({ message: error.message, status: error.status });
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
    getUserRequest: false,
    getUserFailed: false,
    updateUserRequest: false,
    updateUserFailed: false,
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
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
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
      state.accessToken = "";
      state.refreshToken = "";
      state.name = "";
      state.email = "";
      state.password = "";
    },
    [signOut.rejected]: (state, action) => {
      state.logoutRequest = false;
      state.logoutFailed = true;
      console.log(action.payload);
    },
    [getUserInfo.pending]: (state, action) => {
      state.getUserRequest = true;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.getUserRequest = false;
      state.getUserFailed = false;
      const { user } = action.payload;
      if (user) {
        state.email = user.email;
        state.name = user.name;
      }
    },
    [getUserInfo.rejected]: (state, action) => {
      state.getUserRequest = false;
      state.getUserFailed = true;
      console.log(action.payload);
      if (action.payload === "Ошибка 403") {
        localStorage.setItem("isTokenExpired", true);
      }
    },
    [updateUserInfo.pending]: (state, action) => {
      state.updateUserRequest = true;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.updateUserRequest = false;
      state.updateUserFailed = false;
      const { user } = action.payload;
      if (user) {
        state.email = user.email;
        state.name = user.name;
      }
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.updateUserRequest = false;
      state.updateUserFailed = true;
      console.log(action.payload);
      if (action.payload === "Ошибка 403") {
        localStorage.setItem("isTokenExpired", true);
      }
    },
  },
});

export default authSlice.reducer;
