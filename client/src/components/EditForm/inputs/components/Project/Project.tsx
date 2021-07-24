// Libs
import React from 'react';

// Components
import DropDownInput from '../../../DropDownInput/DropDownInput';

// Types
import { ProjectProps } from './ProjectProps';

const Project = ({projectId, projects, handleChange}: ProjectProps) => (<DropDownInput
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
