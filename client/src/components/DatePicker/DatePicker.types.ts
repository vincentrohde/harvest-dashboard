import { FiltersInterface } from '../../types/Filters';

export interface DatePickerProps {
    dateRange: FiltersInterface['dateRange'];
    updateDateRange: Function;
}
