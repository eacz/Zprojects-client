import React, {useContext} from 'react';
import projectContext from '../../context/proyects/projectContext';
import taskContext from '../../context/tasks/taskContext'

const Project = ({project}) => {
    const contextProject = useContext(projectContext)
    const {actualProject} = contextProject

    const contextTask = useContext(taskContext)
    const {getTasks} = contextTask

    const selectProject= id => {
        actualProject(id)
        getTasks(id)
    }

    return ( 
        <li>
            <button
            type="button"
            className="btn btn-blank"
            onClick={() => selectProject(project._id)}
            >
                {project.name}
            </button>
        </li>
     );
}
 
export default Project;