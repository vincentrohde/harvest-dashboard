import { ProjectInterface } from './Project';
import { TaskInterface } from './Task';

export type timeEntriesType = TimeEntryInterface[];

export interface ShallowTimeEntryInterface {
    hours: number | string;
    id: number;
    notes: string;
    spent_date: string;
    is_running: boolean;
    project: ProjectInterface;
    task: TaskInterface;
}

export interface TimeEntryInterface extends ShallowTimeEntryInterface {
    hours: number;
}

export interface ShallowSubmissionEntryInterface {
    notes: ShallowTimeEntryInterface['notes'];
    spent_date: ShallowTimeEntryInterface['spent_date'];
    hours: ShallowTimeEntryInterface['hours'];
    project_id: number | string;
    task_id: number | string;
}

export interface TimeEntrySubmissionInterface extends ShallowSubmissionEntryInterface {
    hours: TimeEntryInterface['hours'];
    project_id: number;
    task_id: number;
}