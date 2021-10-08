import React, { FC } from "react";
import style from "./not-found-404.module.css";

const NotFound404Page: FC = () => {
  return (
    <section className={style.notFound}>
      <div className={style.notFound__container}>
        <p
          className="text text_type_main-large mb-4"
          style={{ fontSize: "200px" }}
        >
          404
        </p>
        <p className="text text_type_main-medium">
          выбранной страницы не существует
        </p>
      </div>
    </section>
  );
};

export default NotFound404Page;
