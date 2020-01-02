import {
    ADD_PROJECTS
} from '../actions/projects';

export const projects = (state = {}, action) => {
    let projects;
    switch (action.type) {
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