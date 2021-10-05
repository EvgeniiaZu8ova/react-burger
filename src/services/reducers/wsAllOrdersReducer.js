import {
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_ALL_ORDERS,
} from "../action-types/wsAllOrders";

const initialState = {
  wsConnected: false,
  allOrders: [],
};

export const wsAllOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_ALL_ORDERS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR_ALL_ORDERS:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED_ALL_ORDERS:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };

    default:
      return state;
  }
};
