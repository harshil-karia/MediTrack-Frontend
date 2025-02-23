import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ProtectedRoute = () => {
    const { token } = useContext(StoreContext);

    return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
