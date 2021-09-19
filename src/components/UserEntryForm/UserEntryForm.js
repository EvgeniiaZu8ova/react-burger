import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import style from "./UserEntryForm.module.css";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function UserEntryForm({ title = "Регистрация" }) {
  const [value, setValue] = useState("");

  return (
    <section className={style.entry}>
      <form noValidate className={style.entry__form}>
        <h2 className="text text_type_main-medium mb-6">{title}</h2>
        {title === "Регистрация" && (
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
        <div className="mb-20">
          <Button type="primary" size="medium">
            {title === "Вход" ? "Войти" : "Зарегистрироваться"}
          </Button>
        </div>
        {title === "Войти" ? (
          <>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?{" "}
              <Link className={style.entry__link}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?{" "}
              <Link className={style.entry__link}>Восстановить пароль</Link>
            </p>
          </>
        ) : (
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?{" "}
            <Link className={style.entry__link}>Войти</Link>
          </p>
        )}
      </form>
    </section>
  );
}

UserEntryForm.propTypes = {
  title: PropTypes.string.isRequired,
};

export default UserEntryForm;
