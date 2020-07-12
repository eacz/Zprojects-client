import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/proyects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {
    const contextProject = useContext(projectContext);
    const { project } = contextProject;

    const contextTask = useContext(taskContext);
    const {
        taskError,
        getTasks,
        addTask,
        showError,
        actualTask,
        updateTask,
    } = contextTask;

    useEffect(() => {
        if (actualTask !== null) {
            setTask(actualTask);
        } else {
            setTask({
                name: '',
            });
        }
    }, [actualTask]);

    const [task, setTask] = useState({
        name: '',
    });
    const { name } = task;

    if (!project) return null;

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            showError();
            return;
        }

        if (actualTask === null) {
            //add a new task
            task.project = project._id;
            task.completed = false
            addTask(task);
        } else {
            //edit an existing task
            updateTask(task);
        }

        getTasks(project._id);

        setTask({
            name: '',
        });
    };

    return (
        <div className="form">
            <form onSubmit={onSubmit}>
                <div className="container-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="container-input">
                    <input
                        type="submit"
                        className="btn btn-block btn-submit btn-primary"
                        value={actualTask ? 'Edit task' : 'Add task'}
                    />
                </div>
            </form>
            {taskError ? (
                <p className="message error">The task must have a name</p>
            ) : null}
        </div>
    );
};

export default TaskForm;
