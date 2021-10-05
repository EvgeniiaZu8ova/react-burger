import {
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_ALL_ORDERS,
} from "../action-types/wsAllOrders";

export const wsConnectionAllOrdersSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS_ALL_ORDERS,
  };
};

export const wsConnectionAllOrdersError = () => {
  return {
    type: WS_CONNECTION_ERROR_ALL_ORDERS,
  };
};

export const wsConnectionAllOrdersClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED_ALL_ORDERS,
  };
};

export const wsGetAllOrders = (data) => {
  return {
    type: WS_GET_ALL_ORDERS,
    payload: data,
  };
};
