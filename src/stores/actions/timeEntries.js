export const ADD_TIME_ENTRIES = 'ADD_TIME_ENTRIES';
export const ADD_TIME_ENTRY = 'ADD_TIME_ENTRY';
export const UPDATE_EDIT_ENTRY = 'UPDATE_EDIT_ENTRY';
export const UPDATE_TIME_ENTRY = 'UPDATE_TIME_ENTRY';
export const DELETE_TIME_ENTRY = 'DELETE_TIME_ENTRY';

export const addTimeEntries = (timeEntries) => {
    return {
        type: ADD_TIME_ENTRIES,
        payload: timeEntries
    }
};

export const addTimeEntry = (timeEntry) => {
    return {
        type: ADD_TIME_ENTRY,
        payload: timeEntry
    }
};

export const updateEditEntry = (id) => {
    return {
        type: UPDATE_EDIT_ENTRY,
        payload: Number(id)
    }
};

export const updateTimeEntry = (timeEntry) => {
    return {
        type: UPDATE_TIME_ENTRY,
        payload: timeEntry
    }
};

export const deleteTimeEntry = (id) => {
    return {
        type: DELETE_TIME_ENTRY,
        payload: Number(id)
    }
};