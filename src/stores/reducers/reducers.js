import { combineReducers } from 'redux';

import { timeEntries } from './timeEntries';
import { projects } from './projects';
import { tasks } from './tasks';

const application = combineReducers({
    timeEntries,
    projects,
    tasks
});

export default application;