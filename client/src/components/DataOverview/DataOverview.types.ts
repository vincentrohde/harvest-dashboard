import { timeEntriesType } from '../../types/TimeEntry';

export type group = 'tasks' | 'projects';
export type groups = group[];

export interface DataOverviewProps {
    timeEntries?: timeEntriesType;
}
