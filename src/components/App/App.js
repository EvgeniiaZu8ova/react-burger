import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { getItems } from "../../services/reducers/allIngredients";

import app from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={app.page}>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <Main />
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
