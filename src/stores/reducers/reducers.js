import { combineReducers } from 'redux';
import { ADD_TIME_ENTRIES } from '../actions/entries';

const entries = (state = {}, action) => {
    switch (action.type) {
        case ADD_TIME_ENTRIES:
            const { timeEntries } = action.payload;
            return {
                ...state,
                timeEntries
            };
        default:
            return state
    }
};

const application = combineReducers({
    entries
});

export default application;