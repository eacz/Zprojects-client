import {
    SUCCESSFUL_REGISTER,
    FAILED_REGISTER,
    GET_USER,
    SUCCESSFUL_LOGIN,
    FAILED_LOGIN,
    CLOSE_SESSION,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_LOGIN:
        case SUCCESSFUL_REGISTER:
            localStorage.setItem('token', action.payload.token);
            return { ...state, auth: true, message: null, loading: false };
        case CLOSE_SESSION:
        case FAILED_LOGIN:
        case FAILED_REGISTER:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                message: action.payload,
                user: null,
                auth: null,
                loading: false,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                auth: true,
                loading: false,
            };
        default:
            return state;
    }
};
