import React from "react";

import app from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";

function App() {
  return (
    <div className={app.page}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;
