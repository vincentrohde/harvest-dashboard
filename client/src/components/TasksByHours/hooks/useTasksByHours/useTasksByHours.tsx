import { useEffect, useState } from 'react';

// Hooks
import { usePrevious } from '../../../../hooks/usePrevious';

// Types
import { timeEntriesType } from '../../../../../interfaces/TimeEntry';
import { tasksByHours } from '../../TasksByHours.types';

export const useTasksByHours = (timeEntries: timeEntriesType | undefined) => {
    const [tasksByHours, setTasksByHours] = useState<tasksByHours>([]);
    const prevTimeEntries = usePrevious(timeEntries);

    const getEntriesWithTask = (entries: timeEntriesType): tasksByHours => entries.map(entry => ({
        category: entry.task.name,
        hours: entry.hours
    }));

    const getUniqueTasksFromEntries = (entries: tasksByHours) => {
        const categoriesOnlyList = entries.map(entry => entry.category);
        return [...new Set(categoriesOnlyList)];
    };

    const getTasksByHoursList = (categories: string[]): tasksByHours => {
        return categories.map((category) => ({
            category,
            hours: 0
        }));
    };

    const addEntryHoursToTasks = (entriesWithCategory: tasksByHours, tasksByHoursList: tasksByHours) => {
        entriesWithCategory.forEach(entry => {
            tasksByHoursList.forEach((category) => {
                if (category.category == entry.category) {
                    category.hours += entry.hours;
                }
            });
        });
    }

    const getTasksByHours = (entries: timeEntriesType): tasksByHours => {
        const entriesWithCategory = getEntriesWithTask(entries);
        const uniqueCategories = getUniqueTasksFromEntries(entriesWithCategory);

        let tasksByHoursList = getTasksByHoursList(uniqueCategories);
        addEntryHoursToTasks(entriesWithCategory, tasksByHoursList);

        return tasksByHoursList;
    };

    useEffect(() => {
        if ((typeof prevTimeEntries === 'undefined' && typeof timeEntries !== 'undefined') ||
            ((typeof prevTimeEntries !== 'undefined' && typeof timeEntries !== 'undefined') &&
                (JSON.stringify(prevTimeEntries) !== JSON.stringify(timeEntries)))) {
            setTasksByHours(getTasksByHours(timeEntries));
        }
    });

    return tasksByHours;
}
