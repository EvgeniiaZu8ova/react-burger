import {
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_ALL_ORDERS,
} from "../action-types/wsAllOrders";

import { TAllOrdersActions } from "../actions/wsAllOrdersActions";

import { TAllOrdersInitialState } from "../../utils/types";

const initialState: TAllOrdersInitialState = {
  wsConnected: false,
  allOrders: { success: false, orders: [], total: 0, totalToday: 0 },
};

export const wsAllOrdersReducer = (
  state = initialState,
  action: TAllOrdersActions
) => {
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
