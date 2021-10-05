import { wsAllOrdersReducer } from "./wsAllOrdersReducer";
import * as types from "../action-types/wsAllOrders";

describe("all orders reducer", () => {
  const initialState = {
    wsConnected: false,
    allOrders: [],
  };

  it("setups WS connection", () => {
    const action = {
      type: types.WS_CONNECTION_SUCCESS_ALL_ORDERS,
    };
    const state = wsAllOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("reacts to connection error", () => {
    const action = {
      type: types.WS_CONNECTION_ERROR_ALL_ORDERS,
    };
    const state = wsAllOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("closes WS connection", () => {
    const action = {
      type: types.WS_CONNECTION_CLOSED_ALL_ORDERS,
    };
    const state = wsAllOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("gets orders", () => {
    const action = {
      type: types.WS_GET_ALL_ORDERS,
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
    const state = wsAllOrdersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      allOrders: action.payload,
    });
  });
});
