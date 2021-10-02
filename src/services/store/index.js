import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers";
import { socketMiddleware } from "../middleware/socketMiddleware";
import { socketAuthMiddleware } from "../middleware/socketAuthMiddleware";

import {
  WS_CONNECTION_START_ALL_ORDERS,
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_ALL_ORDERS,
} from "../action-types/wsAllOrders";

import {
  WS_CONNECTION_START_MY_ORDERS,
  WS_CONNECTION_SUCCESS_MY_ORDERS,
  WS_CONNECTION_ERROR_MY_ORDERS,
  WS_CONNECTION_CLOSED_MY_ORDERS,
  WS_GET_MY_ORDERS,
} from "../action-types/wsMyOrders";

const wsAllOrdersActions = {
  wsInit: WS_CONNECTION_START_ALL_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS_ALL_ORDERS,
  onClose: WS_CONNECTION_CLOSED_ALL_ORDERS,
  onError: WS_CONNECTION_ERROR_ALL_ORDERS,
  onData: WS_GET_ALL_ORDERS,
};

const wsMyOrdersActions = {
  wsInit: WS_CONNECTION_START_MY_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS_MY_ORDERS,
  onClose: WS_CONNECTION_CLOSED_MY_ORDERS,
  onError: WS_CONNECTION_ERROR_MY_ORDERS,
  onData: WS_GET_MY_ORDERS,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      socketMiddleware(
        "wss://norma.nomoreparties.space/orders/all",
        wsAllOrdersActions
      ),
      socketAuthMiddleware(
        "wss://norma.nomoreparties.space/orders",
        wsMyOrdersActions
      )
    ),
});

export default store;
