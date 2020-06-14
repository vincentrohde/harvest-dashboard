import { createSelector } from 'reselect';

const tasksSelector = (state) => state.tasks.tasks;
const projectsSelector = (state) => state.projects.projects;

export const editFormOptionsSelector = createSelector(
    [ tasksSelector, projectsSelector],
    (tasksSelector, projectsSelector) => {
        return {
            tasksSelector,
            projectsSelector
        }
    }
);