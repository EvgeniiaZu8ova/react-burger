import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie";

export default function ProtectedRoute({ children, ...rest }) {
  const { getUserFailed } = useSelector((store) => store.auth);
  const cookie = getCookie("accessToken");

  if (getUserFailed) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookie ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
