export const ADD_TIME_ENTRIES = 'ADD_TIME_ENTRIES';
export const UPDATE_EDIT_ENTRY = 'UPDATE_EDIT_ENTRY';
export const UPDATE_TIME_ENTRY = 'UPDATE_TIME_ENTRY';

export const addTimeEntries = (timeEntries) => {
    return {
        type: ADD_TIME_ENTRIES,
        payload: timeEntries
    }
};

export const updateEditEntry = (id) => {
    return {
        type: UPDATE_EDIT_ENTRY,
        payload: id
    }
};

export const updateTimeEntry = (timeEntry) => {
    return {
        type: UPDATE_TIME_ENTRY,
        payload: timeEntry
    }
};