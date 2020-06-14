import { createSelector } from 'reselect';

const getProjects = (state) => state.projects.projects;

export const projectsSelector = createSelector(
    [ getProjects ],
    getProjects => getProjects
);