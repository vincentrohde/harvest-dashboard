export const ADD_TASKS = 'ADD_TASKS';

export const addTasks = (tasks) => {
    return {
        type: ADD_TASKS,
        payload: tasks
    }
};