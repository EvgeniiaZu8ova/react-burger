import React, { FC, ReactNode, useEffect } from "react";
import { useSelector } from "../../utils/hooks";
import { Route, Redirect } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

type ProtectedRouteProps = {
  children: ReactNode;
} & { [key: string]: any };

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, ...rest }) => {
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
};

export default ProtectedRoute;
