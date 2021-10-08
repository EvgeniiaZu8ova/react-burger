import React, { FC, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../utils/hooks";
import { getCookie } from "../utils/cookie";
import { createUser } from "../services/reducers/auth";

import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import UserEntryForm from "../components/UserEntryForm";

const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const token = getCookie("accessToken");
  const { isRegisterSuccess } = useSelector((store) => store.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function onChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmitClick(e: any) {
    e.preventDefault();

    dispatch(
      createUser({
        email: form.email,
        password: form.password,
        name: form.name,
      })
    );
  }

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  if (isRegisterSuccess) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <UserEntryForm
      onSubmit={handleSubmitClick}
      title="Регистрация"
      buttonText="Зарегистрироваться"
    >
      <div className="mb-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
        />
      </div>
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
    </UserEntryForm>
  );
};

export default RegisterPage;
