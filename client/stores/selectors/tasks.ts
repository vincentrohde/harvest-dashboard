import { createSelector } from 'reselect';

const getTasks = (state) => state.tasks.tasks;

export const tasksSelector = createSelector(
    [ getTasks ],
    getTasks => getTasks
);