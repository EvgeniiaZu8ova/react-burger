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

import { getItems } from "../../services/reducers/allIngredients";

import app from "./App.module.css";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NotFound404Page from "../../pages/not-found-404";
import IngredientPage from "../../pages/ingredient";
import FeedPage from "../../pages/feed";
import FeedOrderPage from "../../pages/feed-order";

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
  const token = getCookie("accessToken");
  const tokenRefresh = getCookie("refreshToken");
  const isTokenExpired = JSON.parse(localStorage.getItem("isTokenExpired"));

  const background =
    (history.action === "PUSH" || history.action === "REPLACE") &&
    location.state &&
    location.state.background;

  const dispatch = useDispatch();
  const { isIngredientsModalOpen } = useSelector(
    (store) => store.ingredientModal
  );

  function closeModal() {
    dispatch(handleIngredientModal(false));
    dispatch(handleCurrentIngredient({}));
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
        <>
          <Route path="/ingredients/:id">
            <Modal
              isModalOpen={isIngredientsModalOpen}
              title="Детали ингредиента"
              onClose={closeModal}
            >
              {isIngredientsModalOpen && <IngredientDetails />}
            </Modal>
          </Route>
          {/* <Route path="/feed/:id">
          <Modal
            isModalOpen={isIngredientsModalOpen}
            title=""
            onClose={closeModal}
          >
            {isIngredientsModalOpen && <IngredientDetails />}
          </Modal>
        </Route> */}
        </>
      )}
    </div>
  );
}
