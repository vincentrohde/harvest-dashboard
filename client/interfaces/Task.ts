import { categoriesType, CategoryInterface } from './Category';

export type tasksType = categoriesType;

export interface TaskInterface extends CategoryInterface {}

export type tasksByHours = TaskByHours[];

export interface TaskByHours {
    task: string;
    hours: number;
}
