import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../utils/cookie";

import UserEntryForm from "../components/UserEntryForm/UserEntryForm";

function ResetPasswordPage() {
  const { accessToken } = useSelector((store) => store.auth);
  const { isPassResetSuccess } = useSelector((store) => store.password);

  const token = getCookie("accessToken");

  useEffect(() => {}, [accessToken]);

  if (token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  if (!isPassResetSuccess) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  return <UserEntryForm />;
}

export default ResetPasswordPage;
