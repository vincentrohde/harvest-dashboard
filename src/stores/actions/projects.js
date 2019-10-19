export const ADD_ACTIVE_PROJECTS = 'ADD_ACTIVE_PROJECTS';
export const ADD_PROJECTS = 'ADD_PROJECTS';

export const addActiveProjects = (projectsActive) => {
    return {
        type: ADD_ACTIVE_PROJECTS,
        payload: projectsActive
    }
};

export const addProjects = (projects) => {
    return {
        type: ADD_PROJECTS,
        payload: projects
    }
};