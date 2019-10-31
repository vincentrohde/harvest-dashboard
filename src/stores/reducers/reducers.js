import { combineReducers } from 'redux';

import { filters } from './filters';
import { timeEntries } from './timeEntries';
import { projects } from './projects';
import { tasks } from './tasks';

const application = combineReducers({
    filters,
    timeEntries,
    projects,
    tasks
});

export default application;