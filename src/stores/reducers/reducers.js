import { combineReducers } from 'redux';

import { entries } from './entries';
import { tasks } from './tasks';

const application = combineReducers({
    entries,
    tasks
});

export default application;