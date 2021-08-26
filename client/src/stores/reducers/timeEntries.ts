// Services
import { objectService } from '@/services/ObjectService/ObjectService';

// Types
import { TimeEntryInterface } from '../../types/TimeEntry';

// Action Types
import {
    ADD_TIME_ENTRIES,
    ADD_TIME_ENTRY,
    UPDATE_EDIT_ENTRY,
    UPDATE_TIME_ENTRY,
    DELETE_TIME_ENTRY
} from '@redux/actions/timeEntries';

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
                    ...state.timeEntries,
                    timeEntry
                ]
            };
        case UPDATE_EDIT_ENTRY:
            return {
                ...state,
                editEntry: action.payload
            };
        case UPDATE_TIME_ENTRY:
            timeEntry = action.payload;
            const updatedEntries = objectService.updateObjectInArray(state.timeEntries, timeEntry);
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
