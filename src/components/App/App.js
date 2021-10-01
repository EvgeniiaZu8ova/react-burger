import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useSelector } from "react-redux";

import {
  handleIngredientModal,
  handleCurrentIngredient,
} from "../../services/reducers/ingredientModal";

import {
  handleOrderCardModal,
  handleCurrentOrder,
} from "../../services/reducers/orderCardModal";

import {
  handleMyOrderCardModal,
  handleMyCurrentOrder,
} from "../../services/reducers/myOrderCardModal";

import { getItems } from "../../services/reducers/allIngredients";

import app from "./App.module.css";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails";
import OrderInfo from "../OrderInfo/OrderInfo";

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFound404Page,
  IngredientPage,
  FeedPage,
  FeedOrderPage,
  ProfileOrdersPage,
  ProfileOrderInfoPage,
} from "../../pages";

import { getCookie } from "../../utils/cookie";
import { getUserInfo, refreshToken } from "../../services/reducers/auth";

export default function App() {
  return (
    <Router>
      <AppSwitch />
    </Router>
  );
}

function AppSwitch() {
  const history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  const token = getCookie("accessToken");
  const tokenRefresh = getCookie("refreshToken");

  const isTokenExpired = JSON.parse(localStorage.getItem("isTokenExpired"));

  const background =
    (history.action === "PUSH" || history.action === "REPLACE") &&
    location.state &&
    location.state.background;

  const { isIngredientsModalOpen } = useSelector(
    (store) => store.ingredientModal
  );
  const { isOrderCardModalOpen } = useSelector((store) => store.orderCardModal);
  const { isMyOrderCardModalOpen } = useSelector(
    (store) => store.myOrderCardModal
  );

  function closeIngredientsModal() {
    dispatch(handleIngredientModal({ isOpen: false }));
    dispatch(handleCurrentIngredient({}));
    history.goBack();
  }

  function closeOrderCardModal() {
    dispatch(handleOrderCardModal({ isOpen: false }));
    dispatch(handleCurrentOrder({}));
    history.goBack();
  }

  function closeMyOrderCardModal() {
    dispatch(handleMyOrderCardModal({ isOpen: false }));
    dispatch(handleMyCurrentOrder({}));
    history.goBack();
  }

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    const actualToken = getCookie("accessToken");
    if (isTokenExpired === null) {
      dispatch(getUserInfo(actualToken));
    } else {
      return token;
    }
  }, [dispatch, token, tokenRefresh, isTokenExpired]);

  useEffect(() => {
    if (isTokenExpired) {
      dispatch(refreshToken(tokenRefresh));
    }
  }, [dispatch, tokenRefresh, isTokenExpired]);

  return (
    <div className={app.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <Main />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id">
          <FeedOrderPage />
        </Route>
        <Route path="/profile/orders" exact={true}>
          <ProfileOrdersPage />
        </Route>
        <Route path="/profile/orders/:id">
          <ProfileOrderInfoPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <NotFound404Page />
        </Route>
      </Switch>
      {background && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal
              isModalOpen={isIngredientsModalOpen}
              title="Детали ингредиента"
              onClose={closeIngredientsModal}
            >
              {isIngredientsModalOpen && <IngredientDetails />}
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal
              isModalOpen={isOrderCardModalOpen}
              title="Детали заказа"
              onClose={closeOrderCardModal}
            >
              {isOrderCardModalOpen && <OrderInfo />}
            </Modal>
          </Route>
          <Route path="/profile/orders/:id">
            <Modal
              isModalOpen={isMyOrderCardModalOpen}
              title="Детали заказа"
              onClose={closeMyOrderCardModal}
            >
              {isMyOrderCardModalOpen && <OrderInfo />}
            </Modal>
          </Route>
        </Switch>
      )}
    </div>
  );
}
