import {
  WS_CONNECTION_SUCCESS_MY_ORDERS,
  WS_CONNECTION_ERROR_MY_ORDERS,
  WS_CONNECTION_CLOSED_MY_ORDERS,
  WS_GET_MY_ORDERS,
} from "../action-types/wsMyOrders";

const initialState = {
  wsConnected: false,
  myOrders: [],
};

export const wsMyOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_MY_ORDERS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR_MY_ORDERS:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED_MY_ORDERS:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MY_ORDERS:
      return {
        ...state,
        myOrders: state.myOrders.length
          ? [...state.myOrders, { ...action.payload }]
          : [{ ...action.payload }],
      };

    default:
      return state;
  }
};
