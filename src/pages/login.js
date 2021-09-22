import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import UserEntryForm from "../components/UserEntryForm/UserEntryForm";

function LoginPage() {
  const { email } = useSelector((store) => store.auth);

  if (email) {
    console.log(email);
    return <Redirect to={{ pathname: "/" }} />;
  }

  return <UserEntryForm />;
}

export default LoginPage;
