// Services
import timeEntryService from '@/services/TimeEntryService/TimeEntryService';

// Types
import { TimeEntryInterface } from '@/types/TimeEntry';

// Action Types
import {
    ADD_TIME_ENTRIES,
    ADD_TIME_ENTRY,
    UPDATE_EDIT_ENTRY,
    UPDATE_TIME_ENTRY,
    DELETE_TIME_ENTRY
} from '@/stores/actions/timeEntries';

export const timeEntries = (state: any = {}, action: any) => {
    let timeEntry: TimeEntryInterface;
    let prevTimeEntries: TimeEntryInterface[];
    switch (action.type) {
        case ADD_TIME_ENTRIES:
            const timeEntries = action.payload;
            return {
                ...state,
                timeEntries: [...timeEntries]
            };
        case ADD_TIME_ENTRY:
            timeEntry = action.payload;
            prevTimeEntries = [...state.timeEntries];
            return {
                ...state,
                timeEntries: timeEntryService.addTimeEntry(timeEntry, prevTimeEntries)
            };
        case UPDATE_EDIT_ENTRY:
            return {
                ...state,
                editEntry: action.payload
            };
        case UPDATE_TIME_ENTRY:
            timeEntry = action.payload;
            prevTimeEntries = [...state.timeEntries];
            return {
                ...state,
                timeEntries: timeEntryService.updateTimeEntry(timeEntry, prevTimeEntries)
            };
        case DELETE_TIME_ENTRY:
            const id = action.payload;
            prevTimeEntries = [...state.timeEntries];
            return {
                ...state,
                timeEntries: timeEntryService.deleteTimeEntry(id, prevTimeEntries)
            }
        default:
            return state
    }
};
