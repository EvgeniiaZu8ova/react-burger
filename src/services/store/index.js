import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers";
import { socketMiddleware } from "../middleware/socketMiddleware";

import {
  WS_CONNECTION_START_ALL_ORDERS,
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_ALL_ORDERS,
} from "../action-types/wsAllOrders";

const wsActions = {
  wsInit: WS_CONNECTION_START_ALL_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS_ALL_ORDERS,
  onClose: WS_CONNECTION_CLOSED_ALL_ORDERS,
  onError: WS_CONNECTION_ERROR_ALL_ORDERS,
  onData: WS_GET_ALL_ORDERS,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware("wss://norma.nomoreparties.space/orders/all", wsActions)
    ),
});

export default store;
