import {createSelector} from 'reselect';

const getTimeEntries = (state: any) => state.timeEntries;

export const timeEntriesSelector = createSelector(
    [getTimeEntries],
    (getTimeEntries) => getTimeEntries,
);
