import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import style from "./UserEntryForm.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function UserEntryForm() {
  const [value, setValue] = useState("");
  const { path } = useRouteMatch();
  const currentPath = path.split("/")[1];

  return (
    <section className={style.entry}>
      <form noValidate className={style.entry__form}>
        <h2 className="text text_type_main-medium mb-6">
          {currentPath === "register" ? "Регистрация" : "Вход"}
        </h2>
        {currentPath === "register" && (
          <div className="mb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              name={"name"}
            />
          </div>
        )}
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={"email"}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={"password"}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            {currentPath === "register" ? "Зарегистрироваться" : "Войти"}
          </Button>
        </div>
        {currentPath === "register" ? (
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?{" "}
            <Link to="login" className={style.entry__link}>
              Войти
            </Link>
          </p>
        ) : (
          <>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?{" "}
              <Link to="register" className={style.entry__link}>
                Зарегистрироваться
              </Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?{" "}
              <Link to="forgot-password" className={style.entry__link}>
                Восстановить пароль
              </Link>
            </p>
          </>
        )}
      </form>
    </section>
  );
}

export default UserEntryForm;
