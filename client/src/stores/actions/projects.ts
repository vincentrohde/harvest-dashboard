// Typescript
import { projectsType } from '../../types/Project';

// Action Types
export const ADD_PROJECTS = 'ADD_PROJECTS';

export const addProjects = (projects: projectsType) => {
    return {
        type: ADD_PROJECTS,
        payload: projects
    }
};
