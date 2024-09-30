import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
