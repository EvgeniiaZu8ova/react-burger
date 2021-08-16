import React from "react";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import header from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={header.header}>
      <div className={header.container}>
        <div className={header.logo}>
          <Logo />
        </div>
        <nav className={header.navBar}>
          <div className={header.navBar__groupedLinks}>
            <a
              href="http://localhost:3000"
              className={`${header.navBar__link} pl-5 pr-5 pb-4 pt-4`}
            >
              <BurgerIcon type="primary" />
              <caption className={`${header.navBar__caption_active} pl-2`}>
                Конструктор
              </caption>
            </a>
            <a
              href="http://localhost:3000"
              className={`${header.navBar__link} pl-5 pr-5 pb-4 pt-4 ml-2`}
            >
              <ListIcon type="secondary" />
              <caption className="text text_type_main-default text_color_inactive pl-2">
                Лента заказов
              </caption>
            </a>
          </div>

          <a
            href="http://localhost:3000"
            className={`${header.navBar__link} pl-5 pr-5 pb-4 pt-4`}
          >
            <ProfileIcon type="secondary" />
            <caption className="text text_type_main-default text_color_inactive pl-2">
              Личный кабинет
            </caption>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;