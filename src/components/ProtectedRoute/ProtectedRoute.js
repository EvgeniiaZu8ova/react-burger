import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../utils/cookie";

import { getUserInfo } from "../../services/reducers/auth";

export default function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { accessToken, getUserFailed } = useSelector((store) => store.auth);
  const cookie = getCookie("accessToken");

  // useEffect(() => {
  //   dispatch(getUserInfo(accessToken));
  // }, [dispatch, accessToken]);

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
