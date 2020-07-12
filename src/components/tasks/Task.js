import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';

const Task = ({ task }) => {
    const contextTask = useContext(taskContext);
    const {
        getTasks,
        deleteTask,
        updateTask,
        saveActualTask,
    } = contextTask;

    const handleDelete = id => {
        deleteTask(id);
        getTasks(task.project);
    };

    const changeComplete = (task) => {
        if (task.completed) {
            task.completed = false;
        } else {
            task.completed = true;
        }
        updateTask(task);
    };

    const selectTask = task => {
        saveActualTask(task)
    }

    return (
        <li className="task shadow">
            <p>{task.name}</p>
            <div className="state">
                {task.completed ? (
                    <button
                        className="complete"
                        type="button"
                        onClick={() => changeComplete(task)}
                    >
                        Complete
                    </button>
                ) : (
                    <button
                        className="incomplete"
                        type="button"
                        onClick={() => changeComplete(task)}
                    >
                        Incomplete
                    </button>
                )}
            </div>
            <div className="actions">
                <button type="button" className="btn btn-primary" onClick={() => selectTask(task)}>
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDelete(task._id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default Task;
