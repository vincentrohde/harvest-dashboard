import { FiltersInterface } from '../../../interfaces/Filters';

export interface DatePickerProps {
    dateRange: FiltersInterface['dateRange'];
    updateDateRange: Function;
}
