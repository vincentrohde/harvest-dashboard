import {groupsType, GroupInterface} from './Group';

export type tasksType = groupsType;

export interface TaskInterface extends GroupInterface {}

export type tasksByHours = TaskByHours[];

export interface TaskByHours {
    task: string;
    hours: number;
}
