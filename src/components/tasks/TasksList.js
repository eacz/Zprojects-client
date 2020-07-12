import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/proyects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import Task from './Task';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TasksList = () => {
    const contextProject = useContext(projectContext);
    const { project, deleteProject } = contextProject;

    const contextTask = useContext(taskContext);
    const { tasksProject } = contextTask;

    if (!project) return <h2>Select a project</h2>;
    return (
        <Fragment>
            {project ? <h2>Project: {project.name}</h2> : null}

            <ul className="tasks-list">
                {tasksProject.length === 0 ? (
                    <p className="task">There is no tasks.</p>
                ) : (
                    <TransitionGroup>
                        {tasksProject.map((task) => (
                            <CSSTransition
                                key={task._id}
                                classNames="task"
                                timeout={300}
                            >
                                <Task task={task} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                )}
            </ul>
            <button
                type="button"
                className="btn btn-delete"
                onClick={() => deleteProject(project._id)}
            >
                Delete project &times;
            </button>
        </Fragment>
    );
};

export default TasksList;
