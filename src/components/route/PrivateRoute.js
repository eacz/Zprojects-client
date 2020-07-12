import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    const contextAuth = useContext(authContext);
    const { auth, authUser, loading } = contextAuth;
    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, []);
    return (
        <Route
            {...props}
            render={(props) =>
                !auth && !loading ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
