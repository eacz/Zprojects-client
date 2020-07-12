import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/proyects/projectContext';
import alertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ProjectList = () => {
    const contextProject = useContext(projectContext);
    const { message, projects, getProjects } = contextProject;

    const contextAlert = useContext(alertContext);
    const { alert, showAlert } = contextAlert;

    useEffect(() => {
        if (message) {
            showAlert(message.message, message.category);
        }
        getProjects();
        //eslint-disable-next-line
    }, [message]);

    if (projects.length === 0)
        return <p>There is no projects, start by creating one!</p>;

    return (
        <ul className="list-projects">
            {alert ? (
                <div className={`alert ${alert.category}`}>{alert.message}</div>
            ) : null}
            <TransitionGroup>
                {projects.map((project) => (
                    <CSSTransition
                        key={project._id}
                        classNames="project"
                        timeout={400}
                    >
                        <Project project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ProjectList;
