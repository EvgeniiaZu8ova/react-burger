import React, { useState, useEffect } from "react";

import app from "./App.module.css";

import api from "../../utils/Api";

import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .getIngredientsData()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Ошибка при загрузке данных об ингредиентах", err.message);
      });
  }, []);

  return (
    <div className={app.page}>
      <AppHeader />
      <Main ingredients={data} />
    </div>
  );
}

export default App;
