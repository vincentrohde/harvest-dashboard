import { TimeEntryInterface } from '@/types/TimeEntry';
import { TaskInterface } from '@/types/Task';

export interface MetaDataProps {
    date: TimeEntryInterface['spent_date'];
    notes: TimeEntryInterface['notes'];
    task: TaskInterface['name'];
}
