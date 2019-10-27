import { createSelector } from 'reselect';

const activeTasksSelector = (state) => state.tasks.tasksActive;
const activeProjectsSelector = (state) => state.projects.projectsActive;

export const editFormOptionsSelector = createSelector(
    [ activeTasksSelector, activeProjectsSelector],
    (activeTasksSelector, activeProjectsSelector) => {
        return {
            activeTasksSelector,
            activeProjectsSelector
        }
    }
);