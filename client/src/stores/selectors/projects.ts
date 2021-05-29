import { createSelector } from 'reselect';

const getProjects = (state: any) => state.projects.projects;

export const projectsSelector = createSelector(
    [ getProjects ],
    getProjects => getProjects
);