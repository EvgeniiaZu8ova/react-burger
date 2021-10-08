import React, { FC, ReactNode, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "../../utils/hooks";

import style from "./UserEntryForm.module.css";

interface UserEntryFormProps {
  children: ReactNode;
  onSubmit: (e: any) => void;
  title: string;
  buttonText: string;
}

const UserEntryForm: FC<UserEntryFormProps> = ({
  children,
  onSubmit,
  title,
  buttonText,
}) => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const { registerRequest, registerFailed, loginRequest, loginFailed } =
    useSelector((store) => store.auth);

  const { isPassResetSuccess, isPassChangeSuccess } = useSelector(
    (store) => store.password
  );

  useEffect(() => {
    if (isPassResetSuccess) {
      history.push("/reset-password");
    }
  }, [isPassResetSuccess, history]);

  useEffect(() => {
    if (isPassChangeSuccess) {
      history.push("/login");
    }
  }, [isPassChangeSuccess, history]);

  return (
    <section className={style.entry}>
      <form noValidate onSubmit={onSubmit} className={style.entry__form}>
        <h2 className="text text_type_main-medium mb-6">{title}</h2>
        {children}

        <div className="mb-20">
          {path === "/register" ? (
            <button
              type="submit"
              className={`${style.button} ${style.button_type_primary} ${style.button_size_medium}`}
            >
              {registerRequest
                ? "Подождите..."
                : registerFailed
                ? "Что-то пошло не так :("
                : buttonText}
            </button>
          ) : path === "/login" ? (
            <button
              type="submit"
              className={`${style.button} ${style.button_type_primary} ${style.button_size_medium}`}
            >
              {loginRequest
                ? "Подождите..."
                : loginFailed
                ? "Что-то пошло не так :("
                : buttonText}
            </button>
          ) : (
            <button
              type="submit"
              className={`${style.button} ${style.button_type_primary} ${style.button_size_medium}`}
            >
              {buttonText}
            </button>
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
};

export default UserEntryForm;
