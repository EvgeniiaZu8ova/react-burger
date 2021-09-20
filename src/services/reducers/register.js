import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/Api";

export const createUser = createAsyncThunk(
  "register/createUser",
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

const registerSlice = createSlice({
  name: "register",
  initialState: {
    name: "",
    email: "",
    accessToken: "",
    refreshToken: "",
    registerRequest: false,
    registerFailed: false,
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
  },
});

export default registerSlice.reducer;
