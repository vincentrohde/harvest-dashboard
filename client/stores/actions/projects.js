export const ADD_PROJECTS = 'ADD_PROJECTS';

export const addProjects = (projects) => {
    return {
        type: ADD_PROJECTS,
        payload: projects
    }
};