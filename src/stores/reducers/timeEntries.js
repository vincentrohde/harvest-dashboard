import {
    UPDATE_TIME_ENTRY,
    ADD_TIME_ENTRIES
} from '../actions/timeEntries';

export const timeEntries = (state = {}, action) => {
    switch (action.type) {
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
        case ADD_TIME_ENTRIES:
            const timeEntries = action.payload;
            return {
                ...state,
                timeEntries: [...timeEntries]
            };
        default:
            return state
    }
};