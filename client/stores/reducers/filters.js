import {
    SET_FILTERS,
    UPDATE_DATE_RANGE
} from '../actions/filters';

export const filters = (state = {}, action) => {
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
                dateRange: [...dateRange]
            };
        default:
            return {
                ...state
            }
    }
};