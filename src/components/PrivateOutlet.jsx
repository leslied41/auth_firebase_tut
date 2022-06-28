import React from "react";
import { useAuth } from "./contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};
export default PrivateOutlet;
