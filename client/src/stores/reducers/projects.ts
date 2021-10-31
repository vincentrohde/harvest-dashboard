import {ADD_PROJECTS} from '@/stores/actions/projects';

export const projects = (state = [], action: any) => {
    switch (action.type) {
        case ADD_PROJECTS:
            return [...action.payload];
        default:
            return state;
    }
};
