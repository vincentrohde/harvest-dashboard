import { createSelector } from 'reselect';

const getTimeEntries = (state) => state.timeEntries.timeEntries;
const getEditEntry = (state) => state.timeEntries.editEntry;

export const timeEntriesSelector = createSelector(
    [ getTimeEntries ],
    getTimeEntries => getTimeEntries
);

export const editEntrySelector = createSelector(
    [ getEditEntry ],
    getEditEntry => getEditEntry
);