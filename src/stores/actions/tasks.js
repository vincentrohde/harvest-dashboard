export const ADD_ACTIVE_TASKS = 'ADD_ACTIVE_TASKS';
export const ADD_TASKS = 'ADD_TASKS';

export const addActiveTasks = (tasksActive) => {
    return {
        type: ADD_ACTIVE_TASKS,
        payload: tasksActive
    }
};

export const addTasks = (tasks) => {
    return {
        type: ADD_TASKS,
        payload: tasks
    }
};