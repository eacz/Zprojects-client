import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import authToken from '../../config/authtoken';

import {
    SUCCESSFUL_REGISTER,
    FAILED_REGISTER,
    GET_USER,
    SUCCESSFUL_LOGIN,
    FAILED_LOGIN,
    CLOSE_SESSION,
} from '../../types';

import authReducer from './authReducer';
import authContext from './authContext';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        message: null,
        loading:true
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const registerUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/users', data);

            dispatch({
                type: SUCCESSFUL_REGISTER,
                payload: response.data,
            });
            authUser();
        } catch (error) {
            //console.log(error.response.data.message);
            const alert = {
                message: error.response.data.message,
                category: 'alert-error',
            };
            dispatch({
                type: FAILED_REGISTER,
                payload: alert,
            });
        }
    };

    const authUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            authToken(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            //console.log(response);
            dispatch({
                type: GET_USER,
                payload: response.data.user,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: FAILED_LOGIN,
            });
        }
    };

    const login = async (data) => {
        try {
            const response = await axiosClient.post('/api/auth', data);

            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data,
            });
            authUser();
        } catch (error) {
            const alert = {
                message: error.response.data.message,
                category: 'alert-error',
            };
            dispatch({
                type: FAILED_LOGIN,
                payload: alert,
            });
        }
    };

    const logOut = () => {
        dispatch({
            type:CLOSE_SESSION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                login,
                authUser,
                logOut
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
