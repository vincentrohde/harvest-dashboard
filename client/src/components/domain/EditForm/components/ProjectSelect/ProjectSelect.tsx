// Libs
import React from 'react';

// Components
import Select from '@/components/presentation/Select/Select';

// Types
import {ProjectSelectProps} from './ProjectSelect.types';

const ProjectSelect = ({projectId, projects, handleChange}: ProjectSelectProps) => (
    <Select
        label={{
            children: 'Project',
            htmlFor: 'form-select-control-task',
        }}
        searchInputId={'form-select-control-task'}
        options={projects}
        placeholder="Project"
        name="project_id"
        onChange={handleChange}
        value={projectId}
    />
);

export default ProjectSelect;
