// Typescript
import { timeEntriesType, TimeEntryInterface } from '../../../interfaces/TimeEntry';

// Action Types
import {
    ADD_TIME_ENTRIES,
    ADD_TIME_ENTRY,
    UPDATE_EDIT_ENTRY,
    UPDATE_TIME_ENTRY,
    DELETE_TIME_ENTRY
} from '../actions/timeEntries';

const updateObjectInArray = (array: timeEntriesType, object: TimeEntryInterface) => {
    return array.map((item: TimeEntryInterface) => {
        if (item.id !== object.id) return item;

        return {
            ...item,
            ...object
        }
    })
};

export const timeEntries = (state: any = {}, action: any) => {
    let timeEntry: TimeEntryInterface;
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
            // TODO: refactor method
            const updatedEntries = updateObjectInArray(state.timeEntries, timeEntry);
            return {
                ...state,
                timeEntries: [...updatedEntries]
            };
        case DELETE_TIME_ENTRY:
            const id = action.payload;
            const updatedTimeEntries = state.timeEntries.filter((entry: TimeEntryInterface) => {
                return entry.id !== id;
            });
            return {
                ...state,
                timeEntries: updatedTimeEntries
            }
        default:
            return state
    }
};