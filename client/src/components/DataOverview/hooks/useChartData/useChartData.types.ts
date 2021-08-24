import { TaskByHours, tasksByHours } from '../../../../types/Task';
import { ProjectByHours, projectsByHours } from '../../../../types/Project';

export type byHoursList = tasksByHours[] | projectsByHours[];
export type byHours = tasksByHours | projectsByHours;
export type byHoursItem = TaskByHours | ProjectByHours;

export interface DataSet extends Chart.ChartDataSets {
    data: Array<number | null | undefined | number[]>;
}
