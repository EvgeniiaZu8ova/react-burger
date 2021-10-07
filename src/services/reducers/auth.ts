import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";
import { setCookie, deleteCookie } from "../../utils/cookie.js";
import {
  TAuthSliceInitialState,
  TCreateUserResponse,
  TSignOutResponse,
  TRefreshTokenResponse,
  TGetUserInfoResponse,
  MyKnownError,
} from "../../utils/types";

interface CreateUserAttributes {
  email: string;
  password: string;
  name?: string;
}

interface UpdateUserAttributes {
  accessToken: string;
  name: string;
  email: string;
}

export const createUser = createAsyncThunk<
  TCreateUserResponse,
  CreateUserAttributes,
  {
    rejectValue: MyKnownError;
  }
>("auth/createUser", async ({ email, password, name }, thunkApi) => {
  try {
    const response = await api.register({
      email,
      password,
      name,
    });
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

export const signIn = createAsyncThunk<
  TCreateUserResponse,
  CreateUserAttributes,
  {
    rejectValue: MyKnownError;
  }
>("auth/signIn", async ({ email, password }, thunkApi) => {
  try {
    const response = await api.login({
      email,
      password,
    });
    const { accessToken, refreshToken } = response;
    setCookie("refreshToken", refreshToken);
    setCookie("accessToken", accessToken);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

export const signOut = createAsyncThunk<
  TSignOutResponse,
  string,
  {
    rejectValue: MyKnownError;
  }
>("auth/signOut", async (refreshToken, thunkApi) => {
  try {
    const response = await api.logout(refreshToken);
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
    localStorage.removeItem("isTokenExpired");
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

export const refreshToken = createAsyncThunk<
  TRefreshTokenResponse,
  string | undefined,
  {
    rejectValue: MyKnownError;
  }
>("auth/refreshToken", async (token, thunkApi) => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  try {
    const response = await api.refreshToken(token);
    const { accessToken, refreshToken } = response;
    setCookie("refreshToken", refreshToken);
    setCookie("accessToken", accessToken);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getUserInfo = createAsyncThunk<
  TGetUserInfoResponse,
  string,
  {
    rejectValue: MyKnownError;
  }
>("auth/getUserInfo", async (accessToken, thunkApi) => {
  try {
    const response = await api.getUserInfo(accessToken);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateUserInfo = createAsyncThunk<
  TGetUserInfoResponse,
  UpdateUserAttributes,
  {
    rejectValue: MyKnownError;
  }
>("auth/updateUserInfo", async ({ accessToken, name, email }, thunkApi) => {
  try {
    const response = await api.updateUserInfo({ accessToken, name, email });
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState: TAuthSliceInitialState = {
  name: "",
  email: "",
  accessToken: "",
  refreshToken: "",
  registerRequest: false,
  registerFailed: false,
  isRegisterSuccess: false,
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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, { payload }) => {
      state.registerRequest = true;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.registerRequest = false;
      state.registerFailed = false;
      state.email = payload.user.email;
      state.name = payload.user.name;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isRegisterSuccess = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.registerRequest = false;
      state.registerFailed = true;
      console.log(action.payload);
    });
    builder.addCase(signIn.pending, (state, { payload }) => {
      state.loginRequest = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.loginRequest = false;
      state.loginFailed = false;
      state.email = payload.user.email;
      state.name = payload.user.name;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loginRequest = false;
      state.loginFailed = true;
      console.log(action.payload);
    });
    builder.addCase(refreshToken.pending, (state, { payload }) => {
      state.tokenRequest = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.tokenRequest = false;
      state.tokenFailed = false;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      localStorage.removeItem("isTokenExpired");
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.tokenRequest = false;
      state.tokenFailed = true;
      console.log(action.payload);
    });
    builder.addCase(signOut.pending, (state, { payload }) => {
      state.logoutRequest = true;
    });
    builder.addCase(signOut.fulfilled, (state, { payload }) => {
      state.logoutRequest = false;
      state.logoutFailed = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.name = "";
      state.email = "";
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.logoutRequest = false;
      state.logoutFailed = true;
      console.log(action.payload);
    });
    builder.addCase(getUserInfo.pending, (state, { payload }) => {
      state.getUserRequest = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.getUserRequest = false;
      state.getUserFailed = false;
      const { user } = payload;
      if (user) {
        state.email = user.email;
        state.name = user.name;
      }
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.getUserRequest = false;
      state.getUserFailed = true;
      console.log(action.payload);
      if (action.payload && action.payload.message === "Ошибка 403") {
        localStorage.setItem("isTokenExpired", "true");
      }
    });
    builder.addCase(updateUserInfo.pending, (state, { payload }) => {
      state.updateUserRequest = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      state.updateUserRequest = false;
      state.updateUserFailed = false;
      const { user } = payload;
      if (user) {
        state.email = user.email;
        state.name = user.name;
      }
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.updateUserRequest = false;
      state.updateUserFailed = true;
      console.log(action.payload);
      if (action.payload && action.payload.message === "Ошибка 403") {
        localStorage.setItem("isTokenExpired", "true");
      }
    });
  },
});

export default authSlice.reducer;
