export const ADD_TIME_ENTRIES = 'ADD_TIME_ENTRIES';

export const addTimeEntries = (timeEntries) => {
    return {
        type: ADD_TIME_ENTRIES,
        payload: timeEntries
    }
};