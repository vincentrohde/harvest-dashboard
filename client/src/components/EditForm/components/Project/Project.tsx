// Libs
import React from 'react';

// Components
import DropDown from '@components/DropDown/DropDown';

// Types
import { ProjectProps } from './Project.types';

const Project = ({projectId, projects, handleChange}: ProjectProps) => (<DropDown
    label={{
        children: "Project",
        htmlFor: "form-select-control-task"
    }}
    searchInputId={"form-select-control-task"}
    options={projects}
    placeholder="Project"
    name="project_id"
    onChange={handleChange}
    value={projectId}
/>);

export default Project;
