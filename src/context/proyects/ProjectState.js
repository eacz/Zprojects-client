import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR,
} from '../../types';

const ProjectState = (props) => {
    //FOR TEST

    const initialState = {
        showForm: false,
        projects: [],
        errorForm: false,
        project: null,
        message: null,
    };

    const [state, dispatch] = useReducer(projectReducer, initialState);
    //functions CRUD
    const displayForm = () => {
        dispatch({
            type: FORM_PROJECT,
        });
    };

    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/api/projects');
            //console.log(response.data.projects);
            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects,
            });
        } catch (error) {
            const alert = {
                message: 'There was an error, try again',
                category: 'alert-error',
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
    };

    const addProject = async (project) => {
        try {
            const response = await axiosClient.post('/api/projects', project);
            dispatch({
                type: ADD_PROJECT,
                payload: response.data,
            });
        } catch (error) {
            const alert = {
                message: 'There was an error, try again',
                category: 'alert-error',
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
    };

    const showError = () => {
        dispatch({
            type: VALIDATE_FORM,
        });
    };

    const actualProject = (projectID) => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectID,
        });
    };

    const deleteProject = async (projectID) => {
        try {
            await axiosClient.delete(`/api/projects/${projectID}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectID,
            });
        } catch (error) {
            const alert = {
                message: 'There was an error, try again',
                category: 'alert-error',
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
    };

    return (
        <projectContext.Provider
            value={{
                showForm: state.showForm,
                projects: state.projects,
                errorForm: state.errorForm,
                project: state.project,
                message: state.message,
                displayForm,
                getProjects,
                addProject,
                showError,
                actualProject,
                deleteProject,
            }}
        >
            {props.children}
        </projectContext.Provider>
    );
};

export default ProjectState;
