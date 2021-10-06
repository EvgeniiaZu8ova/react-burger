import { wsMyOrdersReducer } from "./wsMyOrdersReducer";
import * as types from "../action-types/wsMyOrders";

describe("my orders reducer", () => {
  const initialState = {
    wsConnected: false,
    myOrders: [],
  };

  it("setups WS connection", () => {
    const action = {
      type: types.WS_CONNECTION_SUCCESS_MY_ORDERS,
    };
    const state = wsMyOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("reacts to connection error", () => {
    const action = {
      type: types.WS_CONNECTION_ERROR_MY_ORDERS,
    };
    const state = wsMyOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("closes WS connection", () => {
    const action = {
      type: types.WS_CONNECTION_CLOSED_MY_ORDERS,
    };
    const state = wsMyOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("gets my orders", () => {
    const action = {
      type: types.WS_GET_MY_ORDERS,
      payload: {
        success: true,
        orders: [
          {
            _id: "615c66437deb54001ba5f58b",
            ingredients: [
              "60d3b41abdacab0026a733c9",
              "60d3b41abdacab0026a733c8",
              "60d3b41abdacab0026a733c7",
              "60d3b41abdacab0026a733c7",
            ],
          },
        ],
        total: 4163,
        totalToday: 30,
      },
    };
    const state = wsMyOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      myOrders: action.payload,
    });
  });
});
