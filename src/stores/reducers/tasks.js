import {
    ADD_ACTIVE_TASKS,
    ADD_TASKS
} from '../actions/tasks';

export const tasks = (state = {}, action) => {
    let tasks, tasksActive;
    switch (action.type) {
        case ADD_ACTIVE_TASKS:
            tasksActive = action.payload;
            return {
                ...state,
                tasksActive
            };
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