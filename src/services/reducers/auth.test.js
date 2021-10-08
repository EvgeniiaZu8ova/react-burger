import authReducer, {
  createUser,
  signIn,
  signOut,
  refreshToken,
  getUserInfo,
  updateUserInfo,
} from "./auth";

describe("authSlice", () => {
  describe("reducers", () => {
    const initialState = {
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

    it("sets registerRequest true when createUser is pending", () => {
      const action = { type: createUser.pending.type };
      const state = authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, registerRequest: true });
    });

    it("sets user when createUser is fulfilled", () => {
      const action = {
        type: createUser.fulfilled.type,
        payload: {
          success: true,
          user: {
            email: "testuser@yandex.ru",
            name: "testuser",
          },
          accessToken: "token",
          refreshToken: "token",
        },
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        registerRequest: false,
        registerFailed: false,
        email: action.payload.user.email,
        name: action.payload.user.name,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isRegisterSuccess: true,
      });
    });

    it("sets registerRequest false when createUser is rejected", () => {
      const action = {
        type: createUser.rejected.type,
        payload: "Error",
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        registerFailed: true,
      });
    });

    it("sets loginRequest true when signIn is pending", () => {
      const action = { type: signIn.pending.type };
      const state = authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loginRequest: true });
    });

    it("sets user when signIn is fulfilled", () => {
      const action = {
        type: signIn.fulfilled.type,
        payload: {
          success: true,
          accessToken: "token",
          refreshToken: "token",
          user: {
            email: "testuser@yandex.ru",
            name: "testuser",
          },
        },
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loginRequest: false,
        loginFailed: false,
        email: action.payload.user.email,
        name: action.payload.user.name,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      });
    });

    it("sets loginRequest false when signIn is rejected", () => {
      const action = {
        type: signIn.rejected.type,
        payload: "Error",
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loginFailed: true,
      });
    });

    it("sets tokenRequest true when refreshToken is pending", () => {
      const action = { type: refreshToken.pending.type };
      const state = authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, tokenRequest: true });
    });

    it("sets tokens when refreshToken is fulfilled", () => {
      const action = {
        type: refreshToken.fulfilled.type,
        payload: {
          success: true,
          accessToken: "token",
          refreshToken: "token",
        },
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        tokenRequest: false,
        tokenFailed: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      });
    });

    it("sets tokenRequest false when refreshToken is rejected", () => {
      const action = {
        type: refreshToken.rejected.type,
        payload: "Error",
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        tokenFailed: true,
      });
    });

    it("sets logoutRequest true when signOut is pending", () => {
      const action = { type: signOut.pending.type };
      const state = authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, logoutRequest: true });
    });

    it("resets user when signOut is fulfilled", () => {
      const action = {
        type: signOut.fulfilled.type,
        payload: {
          success: true,
          message: "Successful logout",
        },
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        logoutRequest: false,
        logoutFailed: false,
        email: "",
        name: "",
        accessToken: "",
        refreshToken: "",
      });
    });

    it("sets logoutRequest false when signOut is rejected", () => {
      const action = {
        type: signOut.rejected.type,
        payload: "Error",
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        logoutFailed: true,
      });
    });

    it("sets getUserRequest true when getUserInfo is pending", () => {
      const action = { type: getUserInfo.pending.type };
      const state = authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, getUserRequest: true });
    });

    it("sets user info when getUserInfo is fulfilled", () => {
      const action = {
        type: getUserInfo.fulfilled.type,
        payload: {
          success: true,
          user: {
            email: "testuser@yandex.ru",
            name: "testuser",
          },
        },
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        getUserFailed: false,
        email: action.payload.user.email,
        name: action.payload.user.name,
      });
    });

    it("sets getUserRequest false when getUserInfo is rejected", () => {
      const action = {
        type: getUserInfo.rejected.type,
        payload: "Error",
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        getUserFailed: true,
      });
    });

    it("sets updateUserRequest true when updateUserInfo is pending", () => {
      const action = { type: updateUserInfo.pending.type };
      const state = authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, updateUserRequest: true });
    });

    it("update user info when updateUserInfo is fulfilled", () => {
      const action = {
        type: updateUserInfo.fulfilled.type,
        payload: {
          success: true,
          user: {
            email: "teatuser@yandex.ru",
            name: "testuser",
          },
        },
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        updateUserRequest: false,
        email: action.payload.user.email,
        name: action.payload.user.name,
      });
    });

    it("sets updateUserRequest false when updateUserInfo is rejected", () => {
      const action = {
        type: updateUserInfo.rejected.type,
        payload: "Error",
      };
      const state = authReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        updateUserFailed: true,
      });
    });
  });
});
