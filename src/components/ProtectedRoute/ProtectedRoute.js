import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../utils/cookie.js";

export default function ProtectedRoute({ children, ...rest }) {
  const cookie = getCookie("accessToken");
  const { email } = useSelector((store) => store.auth);

  useEffect(() => {}, [email]);

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
