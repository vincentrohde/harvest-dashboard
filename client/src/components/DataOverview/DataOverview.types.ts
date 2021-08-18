import { timeEntriesType } from '../../../interfaces/TimeEntry';

export type group = 'tasks' | 'projects';

export interface DataOverviewProps {
    timeEntries?: timeEntriesType;
}
