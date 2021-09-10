import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getItems } from "../../services/reducers/allIngredients";

import app from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className={app.page}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;
