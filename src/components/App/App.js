import React, { useState, useEffect } from "react";

import app from "./App.module.css";

import api from "../../utils/Api";

import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  function handleItemSearch(arr, item) {
    return arr.find((el) => el.name === item);
  }

  function handleModalSwitch(target) {
    const item = handleItemSearch(data, target);

    if (!isModalOpen && item) {
      setSelectedIngredient(item);
    }

    if (isModalOpen) {
      setSelectedIngredient({});
    }

    setIsModalOpen((prev) => !prev);
  }

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
      <Main ingredients={data} forModalClick={handleModalSwitch} />
      <Modal
        isModalOpen={isModalOpen}
        onClick={handleModalSwitch}
        item={selectedIngredient}
      />
    </div>
  );
}

export default App;
