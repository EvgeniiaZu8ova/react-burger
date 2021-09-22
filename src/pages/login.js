import React from "react";
import { Redirect } from "react-router-dom";
import { getCookie } from "../utils/cookie";

import UserEntryForm from "../components/UserEntryForm/UserEntryForm";

function LoginPage() {
  const cookie = getCookie("accessToken");

  if (cookie) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return <UserEntryForm />;
}

export default LoginPage;
