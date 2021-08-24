// Typescript
import { FiltersInterface } from '../../types/Filters';

// Action Types
export const SET_FILTERS = 'SET_FILTERS';
export const UPDATE_DATE_RANGE = 'UPDATE_DATE_RANGE';

export const setFilters = (filters: FiltersInterface) => {
    return {
        type: SET_FILTERS,
        payload: filters
    }
};

export const updateDateRange = (dateRange: FiltersInterface['dateRange']) => {
    return {
        type: UPDATE_DATE_RANGE,
        payload: dateRange
    }
};
