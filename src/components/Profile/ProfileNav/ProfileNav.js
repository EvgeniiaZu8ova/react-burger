import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../../utils/cookie";

import { signOut } from "../../../services/reducers/auth";

import style from "./ProfileNav.module.css";

function ProfileNav() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const tokenRefresh = getCookie("refreshToken");

  function onSignOut() {
    dispatch(signOut(tokenRefresh));
    history.push("/login");
  }

  return (
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
  );
}

export default ProfileNav;
