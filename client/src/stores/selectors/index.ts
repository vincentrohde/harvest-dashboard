import { createSelector } from 'reselect';

const tasksSelector = (state: any) => state.tasks;
const projectsSelector = (state: any) => state.projects;

export const editFormOptionsSelector = createSelector(
    [ tasksSelector, projectsSelector],
    (tasksSelector, projectsSelector) => {
        return {
            tasksSelector,
            projectsSelector
        }
    }
);
