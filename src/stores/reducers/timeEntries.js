import {
    ADD_TIME_ENTRIES,
    ADD_TIME_ENTRY,
    UPDATE_EDIT_ENTRY,
    UPDATE_TIME_ENTRY,
    DELETE_TIME_ENTRY
} from '../actions/timeEntries';

export const timeEntries = (state = {}, action) => {
    let timeEntry;
    switch (action.type) {
        case ADD_TIME_ENTRIES:
            const timeEntries = action.payload;
            return {
                ...state,
                timeEntries: [...timeEntries]
            };
        case ADD_TIME_ENTRY:
            timeEntry = action.payload;
            return {
                ...state,
                timeEntries: [
                    timeEntry,
                    ...state.timeEntries
                ]
            };
        case UPDATE_EDIT_ENTRY:
            return {
                ...state,
                editEntry: action.payload
            };
        case UPDATE_TIME_ENTRY:
            timeEntry = action.payload;
            const updateObjectInArray = (array) => {
                return array.map((item) => {
                    if (item.id !== timeEntry.id) {
                        return item;
                    }
                    return {
                        ...item,
                        ...timeEntry
                    }
                })
            };
            const updatedEntries = updateObjectInArray(state.timeEntries);
            return {
                ...state,
                timeEntries: [...updatedEntries]
            };
        case DELETE_TIME_ENTRY:
            const id = action.payload;
            const updatedTimeEntries = state.timeEntries.filter(entry => entry.id !== id);
            return {
                ...state,
                timeEntries: updatedTimeEntries
            }
        default:
            return state
    }
};