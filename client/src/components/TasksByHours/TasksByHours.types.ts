// Types
import { timeEntriesType } from '../../../interfaces/TimeEntry';

export type tasksByHours = TaskByHours[];

export interface TaskByHours {
    category: string;
    hours: number;
}

export interface TasksByHoursProps {
    timeEntries?: timeEntriesType;
}
