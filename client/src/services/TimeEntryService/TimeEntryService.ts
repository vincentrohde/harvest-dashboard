// Libs
import timeService from '@/services/TimeService/TimeService';
import objectService from '@/services/ObjectService/ObjectService';

// Types
import {TimeEntryInterface} from '@/types/TimeEntry';

class TimeEntryService {
    addTimeEntry(timeEntry: TimeEntryInterface, timeEntries: TimeEntryInterface[]) {
        for (let i = 0; i < timeEntries.length; i++) {
            const entry = timeEntries[i];
            if (timeService.compareByTimeUnit(timeEntry.spent_date, entry.spent_date) === 0) {
                timeEntries.splice(i, 0, timeEntry);
                break;
            }
        }

        return timeEntries;
    }

    updateTimeEntry(timeEntry: TimeEntryInterface, timeEntries: TimeEntryInterface[]) {
        return objectService.updateObjectInArray(timeEntries, timeEntry);
    }

    deleteTimeEntry(id: TimeEntryInterface['id'], timeEntries: TimeEntryInterface[]) {
        return timeEntries.filter((entry: TimeEntryInterface) => {
            return entry.id !== id;
        });
    }
}

const timeEntryService = new TimeEntryService();

export default timeEntryService;
