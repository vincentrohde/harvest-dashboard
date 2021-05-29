import { createSelector } from 'reselect';

const tasksSelector = (state: any) => state.tasks.tasks;
const projectsSelector = (state: any) => state.projects.projects;

export const editFormOptionsSelector = createSelector(
    [ tasksSelector, projectsSelector],
    (tasksSelector, projectsSelector) => {
        return {
            tasksSelector,
            projectsSelector
        }
    }
);