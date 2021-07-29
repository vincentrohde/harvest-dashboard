// Types
import { timeEntriesType } from '../../../interfaces/TimeEntry';

export type categoriesByHours = CategoryByHours[];

export interface CategoryByHours {
    category: string;
    hours: number;
}

export interface CategoriesOverviewProps {
    timeEntries?: timeEntriesType;
}
