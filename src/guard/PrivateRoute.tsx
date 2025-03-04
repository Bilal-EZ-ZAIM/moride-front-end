import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/login",
  children,
}) => {
  const { isLogin } = useAppSelector((state) => state.auth);
  if (!isLogin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : null;
};
