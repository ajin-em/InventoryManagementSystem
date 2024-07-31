import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('access_token'); 

    return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
