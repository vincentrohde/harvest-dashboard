// Services
import timeService from '@/services/TimeService/TimeService';

// Actions
import {
    SET_FILTERS,
    UPDATE_DATE_RANGE
} from '@/stores/actions/filters';

// Types
import { FiltersInterface } from '@/types/Filters';

const initialState: FiltersInterface = {
    dateRange: [timeService.getCurrentDate()]
};

export const filters = (state = initialState, action: any) => {
    let dateRange;
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...state,
                ...action.payload
            };
        case UPDATE_DATE_RANGE:
            dateRange = action.payload;
            return {
                ...state,
                dateRange: dateRange !== 1 ? [...dateRange] : dateRange,
            };
        default:
            return {
                ...state
            }
    }
};
