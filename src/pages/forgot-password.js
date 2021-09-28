import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../utils/cookie";

import { resetMyPassword } from "../services/reducers/password";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import UserEntryForm from "../components/UserEntryForm/UserEntryForm";

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.auth);
  const token = getCookie("accessToken");

  const [form, setForm] = useState({
    email: "",
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmitClick(e) {
    e.preventDefault();

    dispatch(resetMyPassword(form.email));
  }

  useEffect(() => {}, [accessToken]);

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <UserEntryForm
      onSubmit={handleSubmitClick}
      title="Восстановление пароля"
      buttonText="Восстановить"
    >
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
    </UserEntryForm>
  );
}

export default ForgotPasswordPage;
