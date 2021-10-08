import {
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_ALL_ORDERS,
} from "../action-types/wsAllOrders";

import { TOrdersResponse } from "../../utils/types";

export interface IWsConnectionAllOrdersSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_ALL_ORDERS;
}

export interface IWsConnectionAllOrdersErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR_ALL_ORDERS;
}

export interface IWsConnectionAllOrdersClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED_ALL_ORDERS;
}

export interface IWsGetAllOrdersAction {
  readonly type: typeof WS_GET_ALL_ORDERS;
  readonly payload: TOrdersResponse;
}

export const wsConnectionAllOrdersSuccess =
  (): IWsConnectionAllOrdersSuccessAction => ({
    type: WS_CONNECTION_SUCCESS_ALL_ORDERS,
  });

export const wsConnectionAllOrdersError =
  (): IWsConnectionAllOrdersErrorAction => ({
    type: WS_CONNECTION_ERROR_ALL_ORDERS,
  });

export const wsConnectionAllOrdersClosed =
  (): IWsConnectionAllOrdersClosedAction => ({
    type: WS_CONNECTION_CLOSED_ALL_ORDERS,
  });

export const wsGetAllOrders = (
  payload: TOrdersResponse
): IWsGetAllOrdersAction => ({ type: WS_GET_ALL_ORDERS, payload });

export type TAllOrdersActions =
  | IWsConnectionAllOrdersSuccessAction
  | IWsConnectionAllOrdersErrorAction
  | IWsConnectionAllOrdersClosedAction
  | IWsGetAllOrdersAction;
