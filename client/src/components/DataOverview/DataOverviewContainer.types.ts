import { timeEntriesType } from '../../../interfaces/TimeEntry';

export interface CategoriesOverviewProps {
    timeEntries?: timeEntriesType;
}

export interface DataSet extends Chart.ChartDataSets {
    data: Array<number | null | undefined | number[]>;
}
