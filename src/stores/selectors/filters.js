import { createSelector } from 'reselect';

const getFilters = (state) => state.filters;
const dateRangeFilter = (state) => state.filters.dateRange;

export const filtersSelector = createSelector(
    [ getFilters ],
    getFilters => getFilters
);

export const dateRangeFilterSelector = createSelector(
    [ dateRangeFilter ],
    (dateRangeFilter) => {
        return dateRangeFilter;
    }
);