import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";
import {
  TResetOrChangePasswordResponse,
  TPasswordSliceInitialState,
  MyKnownError,
} from "../../utils/types";

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

interface IChangePassAttributes {
  password: string;
  token: string;
}

export const resetMyPassword = createAsyncThunk<
  TResetOrChangePasswordResponse,
  string,
  {
    rejectValue: MyKnownError;
  }
>("password/resetMyPassword", async (email, thunkApi) => {
  try {
    if (validateEmail(email)) {
      const response = await api.resetPassword(email);
      return response;
    } else {
      throw Error("email is invalid");
    }
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

export const changeMyPassword = createAsyncThunk<
  TResetOrChangePasswordResponse,
  IChangePassAttributes,
  {
    rejectValue: MyKnownError;
  }
>("password/changeMyPassword", async ({ password, token }, thunkApi) => {
  try {
    const response = await api.changePassword({ password, token });
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState: TPasswordSliceInitialState = {
  resetPassRequest: false,
  resetPassFailed: false,
  changePassRequest: false,
  changePassFailed: false,
  isPassResetSuccess: false,
  isPassChangeSuccess: false,
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetMyPassword.pending, (state, { payload }) => {
      state.resetPassRequest = true;
    });
    builder.addCase(resetMyPassword.fulfilled, (state, { payload }) => {
      state.resetPassRequest = false;
      state.resetPassFailed = false;
      state.isPassResetSuccess = true;
    });
    builder.addCase(resetMyPassword.rejected, (state, action) => {
      state.resetPassRequest = false;
      state.resetPassFailed = true;
      console.log(action.payload);
    });

    builder.addCase(changeMyPassword.pending, (state, { payload }) => {
      state.changePassRequest = true;
    });
    builder.addCase(changeMyPassword.fulfilled, (state, { payload }) => {
      state.changePassRequest = false;
      state.changePassFailed = false;
      state.isPassChangeSuccess = true;
    });
    builder.addCase(changeMyPassword.rejected, (state, action) => {
      state.changePassRequest = false;
      state.changePassFailed = true;
      console.log(action.payload);
    });
  },
});

export default passwordSlice.reducer;
