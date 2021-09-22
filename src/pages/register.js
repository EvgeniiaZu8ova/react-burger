import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../utils/cookie";

import UserEntryForm from "../components/UserEntryForm/UserEntryForm";

function RegisterPage() {
  const { accessToken } = useSelector((store) => store.auth);
  const token = getCookie("accessToken");

  useEffect(() => {}, [accessToken]);

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return <UserEntryForm />;
}

export default RegisterPage;
