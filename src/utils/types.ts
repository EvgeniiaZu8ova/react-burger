import store from "../services/store";

export type TIngredient = {
  _id: string | null;
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
  _id: string | null;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  number: number;
};

export type TSendedOrder = {
  ingredients: Array<TIngredient>;
  _id: string | null;
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

export type RootState = ReturnType<typeof store.getState>;

export interface MyKnownError {
  message: string;
}
