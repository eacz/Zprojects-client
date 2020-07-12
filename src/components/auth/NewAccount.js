import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/auth/authContext';

const NewAccount = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });
    const { name, email, password, confirm } = user;

    const contextAlert = useContext(alertContext);
    const { alert, showAlert } = contextAlert;

    const contextAuth = useContext(authContext);
    const { message, auth, registerUser } = contextAuth;

    useEffect(()=> {
        if(auth){
            props.history.push('/projects')
        }
        if(message){
            showAlert(message.message, message.category)
        }
        // eslint-disable-next-line
    }, [message, auth, props.history])

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //validate
        if (
            name.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirm.trim() === ''
        ) {
            showAlert('All fields are required', 'alert-error');
            return;
        }
        //password minimum of 8 characters
        if (password.length < 8) {
            showAlert(
                'The password must have at least 8 characters',
                'alert-error'
            );
            return;
        }
        //repeat password match
        if (password !== confirm) {
            showAlert("The repeat password doesn't match", 'alert-error');
            return;
        }
        //pass to action
        registerUser({ name, email, password });
    };

    return (
        <div className="form-user">
            {alert ? (
                <div className={`alert ${alert.category}`}>{alert.message}</div>
            ) : null}
            <div className="container-form shadow-dark">
                <h1>Get an account</h1>
                <form onSubmit={onSubmit}>
                    <div className="field-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={onChange}
                        />
                    </div>

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
                        <label htmlFor="confirm">Confirm password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            value={confirm}
                            placeholder="Repeat password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="field-form">
                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Sign up"
                        />
                    </div>
                </form>
                <Link to={'/'} className="account-link">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default NewAccount;
