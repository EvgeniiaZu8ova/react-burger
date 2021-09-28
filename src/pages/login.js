import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../utils/cookie";

import { signIn } from "../services/reducers/auth";

import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import UserEntryForm from "../components/UserEntryForm/UserEntryForm";

function LoginPage() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.auth);
  const token = getCookie("accessToken");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmitClick(e) {
    e.preventDefault();

    dispatch(
      signIn({
        email: form.email,
        password: form.password,
      })
    );
  }

  useEffect(() => {}, [accessToken]);

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <UserEntryForm onSubmit={handleSubmitClick} title="Вход" buttonText="Войти">
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
          placeholder={"Пароль"}
        />
      </div>
    </UserEntryForm>
  );
}

export default LoginPage;
