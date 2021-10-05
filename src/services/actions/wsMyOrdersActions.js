import {
  WS_CONNECTION_SUCCESS_MY_ORDERS,
  WS_CONNECTION_ERROR_MY_ORDERS,
  WS_CONNECTION_CLOSED_MY_ORDERS,
  WS_GET_MY_ORDERS,
} from "../action-types/wsMyOrders";

export const wsConnectionMyOrdersSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS_MY_ORDERS,
  };
};

export const wsConnectionMyOrdersError = () => {
  return {
    type: WS_CONNECTION_ERROR_MY_ORDERS,
  };
};

export const wsConnectionMyOrdersClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED_MY_ORDERS,
  };
};

export const wsGetMyOrders = (data) => {
  return {
    type: WS_GET_MY_ORDERS,
    payload: data,
  };
};
