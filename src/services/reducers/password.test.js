import passwordReducer, { resetMyPassword, changeMyPassword } from "./password";

describe("passwordSlice", () => {
  describe("reducers", () => {
    const initialState = {
      resetPassRequest: false,
      resetPassFailed: false,
      changePassRequest: false,
      changePassFailed: false,
      isPassResetSuccess: false,
      isPassChangeSuccess: false,
    };

    it("sets resetPassRequest true when resetMyPassword is pending", () => {
      const action = { type: resetMyPassword.pending.type };
      const state = passwordReducer(initialState, action);
      expect(state).toEqual({ ...initialState, resetPassRequest: true });
    });

    it("sets isPassResetSuccess when resetMyPassword is fulfilled", () => {
      const action = {
        type: resetMyPassword.fulfilled.type,
      };
      const state = passwordReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isPassResetSuccess: true,
      });
    });

    it("sets resetPassFailed true when resetMyPassword is rejected", () => {
      const action = {
        type: resetMyPassword.rejected.type,
        payload: "Error",
      };
      const state = passwordReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        resetPassFailed: true,
      });
    });

    it("sets changePassRequest true when changeMyPassword is pending", () => {
      const action = { type: changeMyPassword.pending.type };
      const state = passwordReducer(initialState, action);
      expect(state).toEqual({ ...initialState, changePassRequest: true });
    });

    it("sets isPassChangeSuccess when changeMyPassword is fulfilled", () => {
      const action = {
        type: changeMyPassword.fulfilled.type,
      };
      const state = passwordReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isPassChangeSuccess: true,
      });
    });

    it("sets changePassFailed true when changeMyPassword is rejected", () => {
      const action = {
        type: changeMyPassword.rejected.type,
        payload: "Error",
      };
      const state = passwordReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        changePassFailed: true,
      });
    });
  });
});
