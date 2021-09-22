import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getUserInfo } from "../../services/reducers/auth";

export default function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { accessToken, getUserFailed, email } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    dispatch(getUserInfo(accessToken));
  }, [dispatch, accessToken]);

  if (getUserFailed) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        email ? (
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
