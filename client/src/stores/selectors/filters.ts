import {createSelector} from 'reselect';

const getFilters = (state: any) => state.filters;
const dateRangeFilter = (state: any) => state.filters.dateRange;

export const filtersSelector = createSelector([getFilters], (getFilters) => getFilters);

export const dateRangeFilterSelector = createSelector([dateRangeFilter], (dateRangeFilter) => {
    return dateRangeFilter;
});
