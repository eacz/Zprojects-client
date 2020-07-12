import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    TASK_STATE,
    ACTUAL_TASK,
    UPDATE_TASK,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                tasksProject: action.payload
            };
        case ADD_TASK:
            return {
                ...state,
                tasksProject: [action.payload, ...state.tasksProject],
                taskError: false,
            };
        case VALIDATE_TASK:
            return { ...state, taskError: true };
        case DELETE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.filter(task=> task._id !== action.payload),
            };
        case TASK_STATE:
            return {
                ...state,
                tasksProject: state.tasksProject.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        case ACTUAL_TASK:
            return { ...state, actualTask: action.payload };
        case UPDATE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                ),
                actualTask: null,
            };
        default:
            return state;
    }
};
