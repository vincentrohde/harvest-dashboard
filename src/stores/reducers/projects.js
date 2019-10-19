import {
    ADD_ACTIVE_PROJECTS,
    ADD_PROJECTS
} from '../actions/projects';

export const projects = (state = {}, action) => {
    let projects, projectsActive;
    switch (action.type) {
        case ADD_ACTIVE_PROJECTS:
            projectsActive = action.payload;
            return {
                ...state,
                projectsActive
            };
        case ADD_PROJECTS:
            projects = action.payload.projects;
            return {
                ...state,
                projects
            };
        default:
            return state
    }
};