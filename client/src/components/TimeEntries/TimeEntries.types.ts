import { timeEntriesType } from '../../types/TimeEntry';

export interface TimeEntriesProps {
    timeEntries: timeEntriesType;
    deleteTimeEntry: Function;
}
