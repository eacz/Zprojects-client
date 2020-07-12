import React, { useContext, useEffect } from 'react';

//components
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import TaskForm from '../tasks/TaskForm';
import TasksList from '../tasks/TasksList';
import authContext from '../../context/auth/authContext';

const Projects = (props) => {
    const contextAuth = useContext(authContext);
    const { authUser } = contextAuth;

    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container-app">
            <Sidebar />
            <div className="principal-section">
                <Header props={props}/>
                <main>
                    <TaskForm />
                    <div className="container-tasks">
                        <TasksList />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;
