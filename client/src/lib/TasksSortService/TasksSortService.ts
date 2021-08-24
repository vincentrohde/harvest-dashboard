// Libs
import { timeEntriesType } from '../../types/TimeEntry';

// Types
import { tasksByHours } from '../../types/Task';

class TasksSortService {
    getEntriesWithTask(entries: timeEntriesType): tasksByHours {
        return entries.map(entry => ({
            task: entry.task.name,
            hours: entry.hours
        }));
    }

    getUniqueTasksFromEntries(entries: tasksByHours) {
        const tasksOnlyList = entries.map(entry => entry.task);
        return [...new Set(tasksOnlyList)];
    };

    getTasksByHoursList (tasks: string[]): tasksByHours {
        return tasks.map((task) => ({
            task,
            hours: 0
        }));
    };

    addEntryHoursToTasks(entriesWithCategory: tasksByHours, tasksByHoursList: tasksByHours) {
        entriesWithCategory.forEach(entry => {
            tasksByHoursList.forEach((category) => {
                if (category.task == entry.task) {
                    category.hours += entry.hours;
                }
            });
        });
    }

    getTasksByHours(entries: timeEntriesType): tasksByHours {
        const entriesWithCategory = this.getEntriesWithTask(entries);
        const uniqueCategories = this.getUniqueTasksFromEntries(entriesWithCategory);

        let tasksByHoursList = this.getTasksByHoursList(uniqueCategories);
        this.addEntryHoursToTasks(entriesWithCategory, tasksByHoursList);

        return tasksByHoursList;
    };
}

export const tasksSortService = new TasksSortService();
