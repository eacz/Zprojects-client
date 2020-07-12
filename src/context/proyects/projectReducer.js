import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_ERROR,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORM_PROJECT:
            return { ...state, showForm: true };
        case GET_PROJECTS:
            return { ...state, projects: action.payload };
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                showForm: false,
                errorForm: false,
            };
        case VALIDATE_FORM:
            return { ...state, errorForm: true };
        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.projects.filter(
                    (project) => project._id === action.payload
                )[0],
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(
                    (project) => project._id !== action.payload
                ),
                project: null,
            };
        case PROJECT_ERROR:
            return {...state, message: action.payload}
        default:
            return state;
    }
};
