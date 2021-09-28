import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const resetMyPassword = createAsyncThunk(
  "password/resetMyPassword",
  async function (email, { rejectWithValue }) {
    try {
      if (validateEmail(email)) {
        const res = await api.resetPassword(email);
        return res;
      } else {
        throw Error("email is invalid");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeMyPassword = createAsyncThunk(
  "password/changeMyPassword",
  async function ({ password, token }, { rejectWithValue }) {
    try {
      const res = await api.changePassword({ password, token });
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    resetPassRequest: false,
    resetPassFailed: false,
    changePassRequest: false,
    changePassFailed: false,
    isPassResetSuccess: false,
    isPassChangeSuccess: false,
  },
  extraReducers: {
    [resetMyPassword.pending]: (state, action) => {
      state.resetPassRequest = true;
    },
    [resetMyPassword.fulfilled]: (state, action) => {
      state.resetPassRequest = false;
      state.resetPassFailed = false;
      state.isPassResetSuccess = true;
    },
    [resetMyPassword.rejected]: (state, action) => {
      state.resetPassRequest = false;
      state.resetPassFailed = true;
      console.log(action.payload);
    },
    [changeMyPassword.pending]: (state, action) => {
      state.changePassRequest = true;
    },
    [changeMyPassword.fulfilled]: (state, action) => {
      state.changePassRequest = false;
      state.changePassFailed = false;
      state.isPassChangeSuccess = true;
    },
    [changeMyPassword.rejected]: (state, action) => {
      state.changePassRequest = false;
      state.changePassFailed = true;
      console.log(action.payload);
    },
  },
});

export default passwordSlice.reducer;
