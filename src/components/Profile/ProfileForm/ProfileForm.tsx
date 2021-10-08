import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../utils/hooks";
import { getCookie } from "../../../utils/cookie";

import { updateUserInfo } from "../../../services/reducers/auth";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./ProfileForm.module.css";

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const token = getCookie("accessToken") || "";
  const isTokenExpired = localStorage.getItem("isTokenExpired");

  const { name, email } = useSelector((store) => store.auth);

  const [form, setForm] = useState({
    name: name,
    email: email,
    password: "",
  });

  function onChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e: any) {
    e.preventDefault();

    if (isTokenExpired === null) {
      dispatch(
        updateUserInfo({
          accessToken: token,
          name: form.name,
          email: form.email,
        })
      );
    } else {
      return token;
    }
  }

  function onReset(e: any) {
    e.preventDefault();

    setForm({
      name: name,
      email: email,
      password: "",
    });
  }

  useEffect(() => {
    setForm({
      name: name,
      email: email,
      password: "",
    });
  }, [email, name]);

  return (
    <form noValidate onSubmit={onSubmit}>
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
  );
};

export default ProfileForm;
