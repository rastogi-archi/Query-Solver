
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();

    console.log(location.pathname);

    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/login" />
        }
        else {
            <Navigate to="/home" />
        }
    }
    if (!isAuthenticated && !(
        location.pathname.includes("/login") ||
        location.pathname.includes("/register")
    )
    ) {
        return <Navigate to="/login" />;
    }
    if (isAuthenticated &&
        (location.pathname.includes("/login") ||
        location.pathname.includes("/register"))
    ){
        return <Navigate to="/home" />
    }
    return <>{children}</>;
}

export default CheckAuth
