import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../utils/cookie";

import {
  getUserInfo,
  updateUserInfo,
  signOut,
  refreshToken,
} from "../../services/reducers/auth";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./Profile.module.css";

function Profile() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const tokenRefresh = getCookie("refreshToken");
  const token = getCookie("accessToken");
  const isTokenExpired = JSON.parse(localStorage.getItem("isTokenExpired"));

  const { name, email, getUserFailed } = useSelector((store) => store.auth);

  const [form, setForm] = useState({
    name: name,
    email: email,
    password: "",
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!isTokenExpired) {
      dispatch(
        updateUserInfo({
          accessToken: token,
          name: form.name,
          email: form.email,
        })
      );
    }
  }

  function onReset(e) {
    e.preventDefault();

    setForm({
      name: name,
      email: email,
      password: "",
    });
  }

  function onSignOut() {
    dispatch(signOut(tokenRefresh));
    history.push("/login");
  }

  useEffect(() => {
    const actualToken = getCookie("accessToken");
    if (!isTokenExpired) {
      dispatch(getUserInfo(actualToken));
    }
  }, [dispatch, email, name, tokenRefresh, isTokenExpired, getUserFailed]);

  useEffect(() => {
    setForm({
      name: name,
      email: email,
      password: "",
    });
  }, [email, name]);

  useEffect(() => {
    if (isTokenExpired) {
      dispatch(refreshToken(tokenRefresh));
    }
  }, [dispatch, tokenRefresh, isTokenExpired, getUserFailed]);

  return (
    <section className={style.profile}>
      <div className={`mr-15 ${style.menu}`}>
        <nav>
          <ul className={style.list}>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={style.link}>
                <p
                  className={`text text_type_main-medium text_color_inactive ${
                    path === "/profile" && style.text_active
                  }`}
                >
                  Профиль
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile/orders" className={style.link}>
                <p
                  className={`text text_type_main-medium text_color_inactive ${
                    path === "/profile/orders" && style.text_active
                  }`}
                >
                  История заказов
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={style.link}>
                <p
                  onClick={onSignOut}
                  className={`text text_type_main-medium text_color_inactive`}
                >
                  Выход
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете &nbsp; изменить свои персональные данные
        </p>
      </div>
      <form noValidate onSubmit={onSubmit} className={style.profile__form}>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={form.name}
            name={"name"}
            error={false}
            disabled={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={onChange}
            icon={"EditIcon"}
            value={form.email}
            name={"email"}
            error={false}
            disabled={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={onChange}
          icon={"EditIcon"}
          value={form.password}
          name={"name"}
          error={false}
          disabled={true}
          errorText={"Ошибка"}
          size={"default"}
        />
        <div className={`${style.buttons} mt-6`}>
          <button
            type="submit"
            className={`${style.button} ${style.button_type_primary} ${style.button_size_medium}`}
          >
            Сохранить
          </button>
          <Button onClick={onReset}>Отмена</Button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
