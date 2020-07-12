import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/proyects/projectContext';

const NewProject = () => {
    const contextProject = useContext(projectContext);
    const {
        showForm,
        displayForm,
        addProject,
        errorForm,
        showError,
    } = contextProject;

    const [project, setProject] = useState({
        name: '',
    });
    const { name } = project;

    const onChangeProject = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitProject = (e) => {
        e.preventDefault();

        //validate
        if (name.trim() === '') {
            showError()
            return;
        }
        //add to state
        addProject(project);
        //restart the form
        setProject({
            name: '',
        });
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primary"
                onClick={() => displayForm()}
            >
                New Project
            </button>
            {showForm ? (
                <form className="form-new-project" onSubmit={onSubmitProject}>
                    <input
                        className="input-text"
                        type="text"
                        name="name"
                        placeholder="Project's name"
                        onChange={onChangeProject}
                        value={name}
                    />
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Add project"
                    />
                </form>
            ) : null}

            {errorForm ? (
                <p className="message error">Give a name to your project</p>
            ) : null}
        </Fragment>
    );
};

export default NewProject;
