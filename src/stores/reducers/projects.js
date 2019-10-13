import {
    ADD_PROJECTS
} from '../actions/projects';

export const projects = (state = {}, action) => {
    switch (action.type) {
        case ADD_PROJECTS:
            const { projects } = action.payload;
            return {
                ...state,
                projects
            };
        default:
            return state
    }
};