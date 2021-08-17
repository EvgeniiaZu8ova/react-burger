import React, { Component } from "react";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import header from "./AppHeader.module.css";

class AppHeader extends Component {
  render() {
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
                <span className={`${header.navBar__caption_active} pl-2`}>
                  Конструктор
                </span>
              </a>
              <a
                href="http://localhost:3000"
                className={`${header.navBar__link} pl-5 pr-5 pb-4 pt-4 ml-2`}
              >
                <ListIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive pl-2">
                  Лента заказов
                </span>
              </a>
            </div>

            <a
              href="http://localhost:3000"
              className={`${header.navBar__link} pl-5 pr-5 pb-4 pt-4`}
            >
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive pl-2">
                Личный кабинет
              </span>
            </a>
          </nav>
        </div>
      </header>
    );
  }
}

export default AppHeader;
