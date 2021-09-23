import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import header from "./AppHeader.module.css";

function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header className={header.header}>
      <div className={header.container}>
        <div className={header.logo}>
          <Logo />
        </div>
        <nav className={header.navBar}>
          <div className={header.navBar__groupedLinks}>
            <Link
              to="/"
              className={`${header.navBar__link} pl-5 pr-5 pb-4 pt-4`}
            >
              <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
              <span
                className={`${
                  pathname === "/"
                    ? header.navBar__caption_active
                    : "text_color_inactive"
                } text text_type_main-default  pl-2`}
              >
                Конструктор
              </span>
            </Link>
            <Link
              to="/profile/orders"
              className={`${header.navBar__link} pl-5 pr-5 pb-4 pt-4 ml-2`}
            >
              <ListIcon
                type={pathname === "/profile/orders" ? "primary" : "secondary"}
              />
              <span
                className={`${
                  pathname === "/profile/orders"
                    ? header.navBar__caption_active
                    : "text_color_inactive"
                } text text_type_main-default pl-2`}
              >
                Лента заказов
              </span>
            </Link>
          </div>

          <Link
            to="/profile"
            className={`${header.navBar__link} pl-5 pr-5 pb-4 pt-4`}
          >
            <ProfileIcon
              type={
                pathname.includes("/profile") && pathname !== "/profile/orders"
                  ? "primary"
                  : "secondary"
              }
            />
            <span
              className={`${
                pathname.includes("/profile") && pathname !== "/profile/orders"
                  ? header.navBar__caption_active
                  : "text_color_inactive"
              } text text_type_main-default pl-2`}
            >
              Личный кабинет
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
