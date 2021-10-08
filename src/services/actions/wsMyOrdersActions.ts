import {
  WS_CONNECTION_SUCCESS_MY_ORDERS,
  WS_CONNECTION_ERROR_MY_ORDERS,
  WS_CONNECTION_CLOSED_MY_ORDERS,
  WS_GET_MY_ORDERS,
} from "../action-types/wsMyOrders";

import { TOrdersResponse } from "../../utils/types";

export interface IWsConnectionMyOrdersSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_MY_ORDERS;
}

export interface IWsConnectionMyOrdersErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR_MY_ORDERS;
}

export interface IWsConnectionMyOrdersClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED_MY_ORDERS;
}

export interface IWsGetMyOrdersAction {
  readonly type: typeof WS_GET_MY_ORDERS;
  readonly payload: TOrdersResponse;
}

export const wsConnectionMyOrdersSuccess =
  (): IWsConnectionMyOrdersSuccessAction => ({
    type: WS_CONNECTION_SUCCESS_MY_ORDERS,
  });

export const wsConnectionMyOrdersError =
  (): IWsConnectionMyOrdersErrorAction => ({
    type: WS_CONNECTION_ERROR_MY_ORDERS,
  });

export const wsConnectionMyOrdersClosed =
  (): IWsConnectionMyOrdersClosedAction => ({
    type: WS_CONNECTION_CLOSED_MY_ORDERS,
  });

export const wsGetMyOrders = (
  payload: TOrdersResponse
): IWsGetMyOrdersAction => ({ type: WS_GET_MY_ORDERS, payload });

export type TMyOrdersActions =
  | IWsConnectionMyOrdersSuccessAction
  | IWsConnectionMyOrdersErrorAction
  | IWsConnectionMyOrdersClosedAction
  | IWsGetMyOrdersAction;
