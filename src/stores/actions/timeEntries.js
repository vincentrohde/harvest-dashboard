export const UPDATE_TIME_ENTRY = 'UPDATE_TIME_ENTRY';
export const ADD_TIME_ENTRIES = 'ADD_TIME_ENTRIES';

export const updateTimeEntry = (timeEntry) => {
    return {
        type: UPDATE_TIME_ENTRY,
        payload: timeEntry
    }
};

export const addTimeEntries = (timeEntries) => {
    return {
        type: ADD_TIME_ENTRIES,
        payload: timeEntries
    }
};