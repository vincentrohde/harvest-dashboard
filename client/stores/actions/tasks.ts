// Typescript
import { tasksType } from '../../../interfaces/Task';

// Action Types
export const ADD_TASKS = 'ADD_TASKS';

export const addTasks = (tasks: tasksType) => {
    return {
        type: ADD_TASKS,
        payload: tasks
    }
};