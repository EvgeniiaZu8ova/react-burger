import {
  WS_CONNECTION_SUCCESS_MY_ORDERS,
  WS_CONNECTION_ERROR_MY_ORDERS,
  WS_CONNECTION_CLOSED_MY_ORDERS,
  WS_GET_MY_ORDERS,
} from "../action-types/wsMyOrders";

import { TMyOrdersActions } from "../actions/wsMyOrdersActions";

import { TMyOrdersInitialState } from "../../utils/types";

const initialState: TMyOrdersInitialState = {
  wsConnected: false,
  myOrders: { success: false, orders: [], total: 0, totalToday: 0 },
};

export const wsMyOrdersReducer = (
  state = initialState,
  action: TMyOrdersActions
) => {
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
        myOrders: action.payload,
      };

    default:
      return state;
  }
};
