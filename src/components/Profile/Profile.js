import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserInfo,
  updateUserInfo,
  signOut,
} from "../../services/reducers/auth";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./Profile.module.css";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const {
    name,
    email,
    accessToken,
    refreshToken,
    getUserRequest,
    getUserFailed,
    updateUserRequest,
    updateUserFailed,
  } = useSelector((store) => store.auth);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    dispatch(getUserInfo(accessToken));
  }, [dispatch, accessToken]);

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
                  onClick={() => {
                    dispatch(signOut(refreshToken));
                  }}
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
      <form noValidate className={style.profile__form}>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={name || form.name}
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
            value={email || form.email}
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
          disabled={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <div className={`${style.buttons} mt-6`}>
          <Button>Сохранить</Button>
          <Button>Отмена</Button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
