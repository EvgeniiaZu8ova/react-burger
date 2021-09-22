import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { createUser, signIn } from "../../services/reducers/auth";

import api from "../../utils/Api";

import style from "./UserEntryForm.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function UserEntryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
  });
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const history = useHistory();

  const { registerRequest, registerFailed, loginRequest, loginFailed } =
    useSelector((store) => store.auth);

  let title;
  let buttonText;

  switch (path) {
    case "/register":
      title = "Регистрация";
      buttonText = "Зарегистрироваться";
      break;
    case "/login":
      title = "Вход";
      buttonText = "Войти";
      break;
    case "/forgot-password":
      title = "Восстановление пароля";
      buttonText = "Восстановить";
      break;
    default:
      title = "Восстановление пароля";
      buttonText = "Сохранить";
  }

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmitClick(e) {
    e.preventDefault();

    if (path === "/register") {
      dispatch(
        createUser({
          email: form.email,
          password: form.password,
          name: form.name,
        })
      );
    }

    if (path === "/login") {
      dispatch(
        signIn({
          email: form.email,
          password: form.password,
        })
      );
    }

    if (path === "/forgot-password") {
      api
        .resetPassword(form.email)
        .then((res) => {
          history.push("/reset-password");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }

    if (path === "/reset-password") {
      api
        .changePassword({ password: form.password, token: form.token })
        .then((res) => {
          history.push("/login");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <section className={style.entry}>
      <form noValidate className={style.entry__form}>
        <h2 className="text text_type_main-medium mb-6">{title}</h2>
        {path === "/register" && (
          <div className="mb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={form.name}
              name={"name"}
            />
          </div>
        )}
        {(path === "/register" || path === "/login") && (
          <>
            <div className="mb-6">
              <Input
                type={"email"}
                placeholder={"E-mail"}
                onChange={onChange}
                value={form.email}
                name={"email"}
              />
            </div>
            <div className="mb-6">
              <PasswordInput
                onChange={onChange}
                value={form.password}
                name={"password"}
              />
            </div>
          </>
        )}
        {path === "/forgot-password" && (
          <div className="mb-6">
            <Input
              type={"email"}
              placeholder={"Укажите e-mail"}
              onChange={onChange}
              value={form.email}
              name={"email"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
        )}
        {path === "/reset-password" && (
          <>
            <div className="mb-6">
              <PasswordInput
                onChange={onChange}
                value={form.password}
                name={"password"}
              />
            </div>
            <div className="mb-6">
              <Input
                placeholder={"Введите код из письма"}
                onChange={onChange}
                value={form.token}
                name={"token"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
          </>
        )}

        <div className="mb-20">
          {path === "/register" ? (
            <Button onClick={handleSubmitClick} type="primary" size="medium">
              {registerRequest
                ? "Подождите..."
                : registerFailed
                ? "Что-то пошло не так :("
                : buttonText}
            </Button>
          ) : path === "/login" ? (
            <Button onClick={handleSubmitClick} type="primary" size="medium">
              {loginRequest
                ? "Подождите..."
                : loginFailed
                ? "Что-то пошло не так :("
                : buttonText}
            </Button>
          ) : (
            <Button onClick={handleSubmitClick} type="primary" size="medium">
              {buttonText}
            </Button>
          )}
        </div>
        {path === "/register" ? (
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?{" "}
            <Link to="login" className={style.entry__link}>
              Войти
            </Link>
          </p>
        ) : path === "/login" ? (
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
