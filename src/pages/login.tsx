import React, { FC, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "../utils/hooks";
import { getCookie } from "../utils/cookie";
import { THistoryState } from "../utils/types";

import { signIn } from "../services/reducers/auth";

import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import UserEntryForm from "../components/UserEntryForm";

const LoginPage: FC = () => {
  const history = useHistory<THistoryState>();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.auth);
  const token = getCookie("accessToken");
  const from =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.from &&
    history.location.state.from.pathname;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function onChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmitClick(e: any) {
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
    return <Redirect to={{ pathname: from ? from : "/" }} />;
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
        />
      </div>
    </UserEntryForm>
  );
};

export default LoginPage;
