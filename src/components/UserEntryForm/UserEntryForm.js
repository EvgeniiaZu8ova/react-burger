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

  let title;
  let buttonText;

  switch (currentPath) {
    case "register":
      title = "Регистрация";
      buttonText = "Зарегистрироваться";
      break;
    case "login":
      title = "Вход";
      buttonText = "Войти";
      break;
    case "forgot-password":
      title = "Восстановление пароля";
      buttonText = "Восстановить";
      break;
    default:
      title = "Восстановление пароля";
      buttonText = "Сохранить";
  }

  function handleSubmitClick(e) {
    e.preventDefault();
  }

  return (
    <section className={style.entry}>
      <form noValidate className={style.entry__form}>
        <h2 className="text text_type_main-medium mb-6">{title}</h2>
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
        {(currentPath === "register" || currentPath === "login") && (
          <>
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
          </>
        )}
        {currentPath === "forgot-password" && (
          <div className="mb-6">
            <Input
              type={"email"}
              placeholder={"Укажите e-mail"}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              name={"email"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
        )}
        {currentPath === "reset-password" && (
          <>
            <div className="mb-6">
              <PasswordInput
                onChange={(e) => setValue(e.target.value)}
                value={value}
                name={"password"}
              />
            </div>
            <div className="mb-6">
              <Input
                placeholder={"Введите код из письма"}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                name={"code"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
          </>
        )}

        <div className="mb-20">
          <Button onClick={handleSubmitClick} type="primary" size="medium">
            {buttonText}
          </Button>
        </div>
        {currentPath === "register" ? (
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?{" "}
            <Link to="login" className={style.entry__link}>
              Войти
            </Link>
          </p>
        ) : currentPath === "login" ? (
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
        ) : (
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{" "}
            <Link to="login" className={style.entry__link}>
              Войти
            </Link>
          </p>
        )}
      </form>
    </section>
  );
}

export default UserEntryForm;
