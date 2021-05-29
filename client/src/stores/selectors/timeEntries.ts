import { createSelector } from 'reselect';

const getTimeEntries = (state: any) => state.timeEntries.timeEntries;
const getEditEntry = (state: any) => state.timeEntries.editEntry;

export const timeEntriesSelector = createSelector(
    [ getTimeEntries ],
    getTimeEntries => getTimeEntries
);

export const editEntrySelector = createSelector(
    [ getEditEntry ],
    getEditEntry => getEditEntry
);