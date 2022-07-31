import tasksSortService from './TasksSortService';
import {tasksByHours} from '@/types/Task';

describe('getEntriesWithTask', () => {
    it('Returns a list of entries, that only contains the task name and hours for each entry', () => {
        expect(tasksSortService.getEntriesWithTask([
            {
                hours: 0.1, id: 1, notes: '', spent_date: '', is_running: false,
                project: { id: 1, name: 'Test Project 1' },
                task: { id: 1, name: 'Test Task 1' }
            },
            {
                hours: 0.3, id: 2, notes: '', spent_date: '', is_running: false,
                project: { id: 2, name: 'Test Project 2' },
                task: { id: 1, name: 'Test Task 1' }
            },
            {
                hours: 0.4, id: 3, notes: '', spent_date: '', is_running: false,
                project: { id: 1, name: 'Test Project 1' },
                task: { id: 2, name: 'Test Task 2' }
            },
        ])).toStrictEqual([
            { task: 'Test Task 1', hours: 0.1 },
            { task: 'Test Task 1', hours: 0.3 },
            { task: 'Test Task 2', hours: 0.4 }
        ]);
    });
});

describe('getUniqueTasksFromEntries', () => {
    it('Returns a list of unique tasks', () => {
        expect(tasksSortService.getUniqueTasksFromEntries([
            { task: 'Test Task 1', hours: 0.1 },
            { task: 'Test Task 1', hours: 0.3 },
            { task: 'Test Task 2', hours: 0.4 },
            { task: 'Test Task 2', hours: 1 }
        ])).toStrictEqual(['Test Task 1', 'Test Task 2' ]);
    });
});

describe('getTasksByHoursList', () => {
    it('Returns a list of task objects, that contain an hours property with a value of 0', () => {
        expect(tasksSortService.getTasksByHoursList(['Test Task 1', 'Test Task 2' ]))
            .toStrictEqual([
                { task: 'Test Task 1', hours: 0 },
                { task: 'Test Task 2', hours: 0 }
            ]);
    });
});

describe('getTasksByHoursList', () => {
    it('Returns a list of task objects, that contain an hours property with a value of 0', () => {
        expect(tasksSortService.getTasksByHoursList(['Test Task 1', 'Test Task 2' ]))
            .toStrictEqual([
                { task: 'Test Task 1', hours: 0 },
                { task: 'Test Task 2', hours: 0 }
            ]);
    });
});

describe('addEntryHoursToTasks', () => {
    it('Updates the hours inside the other list', () => {
        const timeEntries = [
            { task: 'Test Task 1', hours: 0.1 },
            { task: 'Test Task 1', hours: 0.3 },
            { task: 'Test Task 2', hours: 0.4 },
            { task: 'Test Task 2', hours: 1 }
        ];

        const tasksList = [
            { task: 'Test Task 1', hours: 0 },
            { task: 'Test Task 2', hours: 0 }
        ];

        tasksSortService.addEntryHoursToTasks(timeEntries, tasksList);

        expect(tasksList).toStrictEqual([
            { task: 'Test Task 1', hours: 0.4 },
            { task: 'Test Task 2', hours: 1.4 }
        ]);
    });

    it('Empty array doesn\'t break the code', () => {
        const tasksList: tasksByHours = [];
        tasksSortService.addEntryHoursToTasks([], tasksList);
        expect(tasksList).toStrictEqual([]);
    });
});
