import { combineReducers } from 'redux';
import {
    UPDATE_TIME_ENTRY,
    ADD_TIME_ENTRIES
} from '../actions/entries';

const entries = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TIME_ENTRY:
            const timeEntry = action.payload;
            const updateObjectInArray = (array) => {
                return array.map((item) => {
                    if (item.id !== timeEntry.id) {
                        return item;
                    }
                    return {
                        ...item,
                        ...timeEntry
                    }
                })
            };
            return {
                ...state,
                timeEntries: updateObjectInArray(state.timeEntries)
            };
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