import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../utils/cookie";

import { changeMyPassword } from "../services/reducers/password";

import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import UserEntryForm from "../components/UserEntryForm/UserEntryForm";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.auth);
  const { isPassResetSuccess } = useSelector((store) => store.password);

  const [form, setForm] = useState({
    password: "",
    token: "",
  });

  const token = getCookie("accessToken");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmitClick(e) {
    e.preventDefault();

    dispatch(changeMyPassword({ password: form.password, token: form.token }));
  }

  useEffect(() => {}, [accessToken]);

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  if (!isPassResetSuccess) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  return (
    <UserEntryForm
      onSubmit={handleSubmitClick}
      title="Восстановление пароля"
      buttonText="Сохранить"
    >
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
    </UserEntryForm>
  );
}

export default ResetPasswordPage;
