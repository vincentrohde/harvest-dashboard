import {
    ADD_TASKS
} from '../actions/tasks';

export const tasks = (state = {}, action) => {
    switch (action.type) {
        case ADD_TASKS:
            const { tasks } = action.payload;
            return {
                ...state,
                tasks
            };
        default:
            return state
    }
};