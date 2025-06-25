import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, authRole, ...rest }) => {
  const profile = JSON.parse(window.localStorage.getItem("profile"));

  return (
    <Route
      {...rest}
      render={() => {
        // console.log(authRole);
        return profile && authRole.includes(profile.role) ? children : <Redirect to="/auth/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
