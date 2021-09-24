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
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NotFound404Page from "../../pages/not-found-404";
import IngredientPage from "../../pages/ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

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
  let background = location.state && location.state.background;
  const dispatch = useDispatch();
  const { isIngredientsModalOpen } = useSelector(
    (store) => store.ingredientModal
  );

  function closeModal() {
    dispatch(handleIngredientModal(false));
    dispatch(handleCurrentIngredient({}));
    background = null;
    history.push("/");
  }

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    return null;
  }, [background, location]);

  return (
    <div className={app.page}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <Main />
        </Route>
        {/* {isIngredientsModalOpen ? (
            <Route path="/ingredients/:id">
              <Main />
            </Route>
          ) : (
            <Route path="/ingredients/:id">
              <IngredientPage />
            </Route>
          )} */}
        {!background && (
          <Route path="/ingredients/:id">
            <IngredientPage />
          </Route>
        )}
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
      {background && history.action !== "POP" && (
        <Route path="/ingredients/:id">
          <Modal
            isModalOpen={isIngredientsModalOpen}
            title="Детали ингредиента"
            onClose={closeModal}
          >
            {isIngredientsModalOpen && <IngredientDetails />}
          </Modal>
        </Route>
      )}
    </div>
  );
}
