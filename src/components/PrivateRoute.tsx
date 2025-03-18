import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../services/AuthedContext";


interface PrivateRouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login with the current path saved for redirecting after login
        return <Navigate to="/login/" state={{ from: location }} replace />;
    } else {
        return (
            <>
                <Component />
            </>
        );
    }


};

export default PrivateRoute;
