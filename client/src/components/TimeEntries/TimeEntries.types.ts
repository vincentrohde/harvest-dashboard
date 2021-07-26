import { timeEntriesType } from '../../../interfaces/TimeEntry';

export interface TimeEntriesProps {
    timeEntries: timeEntriesType;
    deleteTimeEntry: Function;
}
