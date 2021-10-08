import store from "../services/store";

export type TIngredient = {
  _id: string | undefined;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string | undefined;
  image_large: string | undefined;
  __v: number | null;
};

export type TIngredientModalInitialState = {
  currentIngredient: TIngredient;
  isIngredientsModalOpen: boolean;
};

export type TIngredientsInitialState = {
  allIngredients: Array<TIngredient>;
  allIngredientsRequest: boolean;
  allIngredientsFailed: boolean;
};

export type TAllIngredientsResponse = {
  success: boolean;
  data: Array<TIngredient>;
};

export type TOrder = {
  _id: string | undefined;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  number: number;
};

export type TOrdersResponse = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export type TAllOrdersInitialState = {
  wsConnected: boolean;
  allOrders: TOrdersResponse;
};

export type TMyOrdersInitialState = {
  wsConnected: boolean;
  myOrders: TOrdersResponse;
};

export type TSendedOrder = {
  ingredients: Array<TIngredient>;
  _id: string | undefined;
  owner: {
    name: string;
    email: string;
    createdAt: string | null;
    updatedAt: string | null;
  };
  status: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  number: number;
  price: number;
};

export type TSendedOrderResponse = {
  success: boolean;
  name: string;
  order: TSendedOrder;
};

export type TOrderSliceInitialState = {
  chosenBun: TIngredient;
  chosenOtherItems: Array<TIngredient>;
  orderObject: TSendedOrder;
  orderRequest: boolean;
  orderFailed: boolean;
  isOrderModalOpen: boolean;
};

export type TOrderCardModalInitialState = {
  currentOrder: TOrder;
  isOrderCardModalOpen: boolean;
};

export type TMyOrderCardModalInitialState = {
  myCurrentOrder: TOrder;
  isMyOrderCardModalOpen: boolean;
};

export type TAuthSliceInitialState = {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  registerRequest: boolean;
  registerFailed: boolean;
  isRegisterSuccess: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  tokenRequest: boolean;
  tokenFailed: boolean;
  getUserRequest: boolean;
  getUserFailed: boolean;
  updateUserRequest: boolean;
  updateUserFailed: boolean;
};

export type TCreateUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TSignOutResponse = {
  success: boolean;
  message: string;
};

export type TResetOrChangePasswordResponse = {
  success: boolean;
  message: string;
};

export type TPasswordSliceInitialState = {
  resetPassRequest: boolean;
  resetPassFailed: boolean;
  changePassRequest: boolean;
  changePassFailed: boolean;
  isPassResetSuccess: boolean;
  isPassChangeSuccess: boolean;
};

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TGetUserInfoResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TLocationState = {
  background: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: undefined;
  };
};

export type THistoryState = {
  from: {
    pathname: string;
  };
};

export type TParamsWithIdState = {
  id: string | undefined;
};

export type RootState = ReturnType<typeof store.getState>;

export interface MyKnownError {
  message: string;
}
