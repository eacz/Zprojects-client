import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alerts/alertContext';

const Login = (props) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { email, password } = user;

    const contextAlert = useContext(alertContext);
    const { showAlert, alert } = contextAlert;

    const contextAuth = useContext(authContext);
    const { message, auth, login} = contextAuth;

    useEffect(()=>{
        if(auth){
            props.history.push('/projects')
        }
        if(message){
            showAlert(message.message, message.category)
        }
        // eslint-disable-next-line
    },[message, auth, props.history]) 

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        //validate
        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alert-error')
           return;
        }
        //pass to action
        login({email, password})
    };

    return (
        <div className="form-user">
            {alert ? (
                <div className={`alert ${alert.category}`}>{alert.message}</div>
            ) : null}
            <div className="container-form shadow-dark">
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="field-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="field-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="field-form">
                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Login"
                        />
                    </div>
                </form>
                <Link to={'/new-account'} className="account-link">
                    Get an account!
                </Link>
            </div>
        </div>
    );
};

export default Login;
