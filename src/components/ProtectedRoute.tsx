import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { userLoggedIn } = useAuth();
    if (!userLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};