import { TimeEntryInterface } from '../../../../../interfaces/TimeEntry';
import { TaskInterface } from '../../../../../interfaces/Task';

export interface MetaDataProps {
    date: TimeEntryInterface['spent_date'];
    notes: TimeEntryInterface['notes'];
    task: TaskInterface['name'];
}
