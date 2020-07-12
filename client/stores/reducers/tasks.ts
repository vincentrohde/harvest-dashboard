import {
    ADD_TASKS
} from '../actions/tasks';

export const tasks = (state = {}, action: any) => {
    let tasks;
    switch (action.type) {
        case ADD_TASKS:
            tasks = action.payload.tasks;
            return {
                ...state,
                tasks
            };
        default:
            return state
    }
};