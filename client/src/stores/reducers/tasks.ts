import {ADD_TASKS} from '@/stores/actions/tasks';

export const tasks = (state = [], action: any) => {
    switch (action.type) {
        case ADD_TASKS:
            return [...action.payload];
        default:
            return state;
    }
};
