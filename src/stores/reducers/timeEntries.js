import {
    ADD_TIME_ENTRIES,
    UPDATE_EDIT_ENTRY,
    UPDATE_TIME_ENTRY
} from '../actions/timeEntries';

export const timeEntries = (state = {}, action) => {
    switch (action.type) {
        case ADD_TIME_ENTRIES:
            const timeEntries = action.payload;
            return {
                ...state,
                timeEntries: [...timeEntries]
            };
        case UPDATE_EDIT_ENTRY:
            return {
                ...state,
                editEntry: action.payload
            };
        case UPDATE_TIME_ENTRY:
            const timeEntry = action.payload;
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
        default:
            return state
    }
};