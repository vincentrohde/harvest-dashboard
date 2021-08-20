import { timeEntriesType } from '../../../interfaces/TimeEntry';

export type group = 'tasks' | 'projects';
export type groups = group[];

export interface DataOverviewProps {
    timeEntries?: timeEntriesType;
}
