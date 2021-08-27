// Services
import timeEntryService from '@/services/TimeEntryService/TimeEntryService';

// Types
import { TimeEntryInterface } from '@/types/TimeEntry';

// Action Types
import {
    ADD_TIME_ENTRIES,
    ADD_TIME_ENTRY,
    UPDATE_TIME_ENTRY,
    DELETE_TIME_ENTRY
} from '@/stores/actions/timeEntries';

export const timeEntries = (state: TimeEntryInterface[] = [], action: any) => {
    let timeEntry: TimeEntryInterface;
    let prevTimeEntries: TimeEntryInterface[];
    switch (action.type) {
        case ADD_TIME_ENTRIES:
            return [...action.payload];
        case ADD_TIME_ENTRY:
            timeEntry = action.payload;
            prevTimeEntries = [...state];
            return [...timeEntryService.addTimeEntry(timeEntry, prevTimeEntries)];
        case UPDATE_TIME_ENTRY:
            timeEntry = action.payload;
            prevTimeEntries = [...state];
            return [...timeEntryService.updateTimeEntry(timeEntry, prevTimeEntries)];
        case DELETE_TIME_ENTRY:
            const id = action.payload;
            prevTimeEntries = [...state];
            return [...timeEntryService.deleteTimeEntry(id, prevTimeEntries)]
        default:
            return state
    }
};
