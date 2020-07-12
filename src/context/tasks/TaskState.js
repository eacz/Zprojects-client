import React, { useReducer } from 'react';
import taskReducer from './taskReducer';
import taskContext from './taskContext';
import axiosClient from '../../config/axios';

import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
} from '../../types';

const TaskState = (props) => {
    const initialState = {
        tasksProject: [],
        taskError: false,
        actualTask: null,
    };

    const [state, dispatch] = useReducer(taskReducer, initialState);

    const getTasks = async (project) => {
        try {
            const response = await axiosClient.get('/api/tasks', {
                params: { project },
            });
            //console.log(response);
            dispatch({
                type: TASKS_PROJECT,
                payload: response.data.tasks,
            });
        } catch (error) {}
    };

    const addTask = async (task) => {
        try {
            const response = await axiosClient.post('/api/tasks', task);
            //console.log(response.data.task);
            dispatch({
                type: ADD_TASK,
                payload: response.data.task,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const showError = () => {
        dispatch({
            type: VALIDATE_TASK,
        });
    };

    const deleteTask = async (taskID) => {
        try {
            await axiosClient.delete(`/api/tasks/${taskID}`);
            dispatch({
                type: DELETE_TASK,
                payload: taskID,
            });
        } catch (error) {
            //console.log(error);
        }
    };

    const updateTask = async (task) => {
        try {
            const response = await axiosClient.put(`/api/tasks/${task._id}`, task)
            //console.log(response.data)
            dispatch({
                type: UPDATE_TASK,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const saveActualTask = (task) => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task,
        });
    };

    return (
        <taskContext.Provider
            value={{
                tasksProject: state.tasksProject,
                taskError: state.taskError,
                actualTask: state.actualTask,
                getTasks,
                addTask,
                showError,
                deleteTask,
                saveActualTask,
                updateTask,
            }}
        >
            {props.children}
        </taskContext.Provider>
    );
};

export default TaskState;
