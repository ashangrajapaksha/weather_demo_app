import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute: React.FC = () => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
