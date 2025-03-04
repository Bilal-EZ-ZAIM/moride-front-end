import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

interface ProtectedRouteProps {
  redirectPath?: string;
}

export const CheckDriver: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/login",
}) => {
  const { isLogin, user } = useAppSelector((state) => state.auth);

  if (!isLogin || user.role !== "driver") {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
