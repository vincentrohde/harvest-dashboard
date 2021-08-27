// Typescript
import { timeEntriesType, TimeEntryInterface } from '@/types/TimeEntry';

// Action Types
export const ADD_TIME_ENTRIES = 'ADD_TIME_ENTRIES';
export const ADD_TIME_ENTRY = 'ADD_TIME_ENTRY';
export const UPDATE_TIME_ENTRY = 'UPDATE_TIME_ENTRY';
export const DELETE_TIME_ENTRY = 'DELETE_TIME_ENTRY';

export const addTimeEntries = (timeEntries: timeEntriesType) => {
    return {
        type: ADD_TIME_ENTRIES,
        payload: timeEntries
    }
};

export const addTimeEntry = (timeEntry: TimeEntryInterface) => {
    return {
        type: ADD_TIME_ENTRY,
        payload: timeEntry
    }
};

export const updateTimeEntry = (timeEntry: TimeEntryInterface) => {
    return {
        type: UPDATE_TIME_ENTRY,
        payload: timeEntry
    }
};

export const deleteTimeEntry = (id: TimeEntryInterface['id']) => {
    return {
        type: DELETE_TIME_ENTRY,
        payload: id
    }
};
