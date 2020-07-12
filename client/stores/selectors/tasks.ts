import { createSelector } from 'reselect';

const getTasks = (state: any) => state.tasks.tasks;

export const tasksSelector = createSelector(
    [ getTasks ],
    getTasks => getTasks
);