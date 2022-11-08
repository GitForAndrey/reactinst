import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateWrapper = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
