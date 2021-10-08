import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCookie } from "../../utils/cookie";

import { getUserInfo, refreshToken } from "../../services/reducers/auth";

import ProfileForm from "../../components/Profile/ProfileForm";
import ProfileNav from "../../components/Profile/ProfileNav";

import style from "./profile.module.css";

const ProfilePage: FC = () => {
  const dispatch = useDispatch();

  const token = getCookie("accessToken");
  const tokenRefresh = getCookie("refreshToken");
  const isTokenExpired = localStorage.getItem("isTokenExpired");

  useEffect(() => {
    if (token && isTokenExpired === null) {
      dispatch(getUserInfo(token));
    } else {
      dispatch(refreshToken(tokenRefresh));
    }
  }, [dispatch, token, tokenRefresh, isTokenExpired]);

  return (
    <section className={style.profile}>
      <ProfileNav />
      <div style={{ marginLeft: "80px" }}>
        <ProfileForm />
      </div>
    </section>
  );
};

export default ProfilePage;
