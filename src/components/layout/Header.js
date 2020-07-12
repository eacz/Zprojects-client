import React, { useContext, useEffect } from 'react';

import authContext from '../../context/auth/authContext';

const Header = ({ props }) => {
    const contextAuth = useContext(authContext);
    const { user, authUser, logOut } = contextAuth;

    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, []);

    return (
        <header className="app-header">
            {user ? (
                <div className="username">
                    Welcome <span>{user.name}</span>
                </div>
            ) : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank log-out"
                    onClick={() => logOut()}
                >
                    Log out
                </button>
            </nav>
        </header>
    );
};

export default Header;
