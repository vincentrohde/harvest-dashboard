import { createSelector } from 'reselect';

const dateRangeFilter = (state) => state.filters.dateRange;

export const dateRangeFilterSelector = createSelector(
    [ dateRangeFilter ],
    (dateRangeFilter) => {
        return dateRangeFilter;
    }
);