import { useEffect, useState } from 'react';

// Hooks
import { usePrevious } from '../../../../hooks/usePrevious';

// Types
import { timeEntriesType } from '../../../../../interfaces/TimeEntry';
import { categoriesByHours } from '../../CategoriesOverview.types';

export const useCategoriesByHours = (timeEntries: timeEntriesType | undefined) => {
    const [categoriesByHours, setCategoriesByHours] = useState<categoriesByHours>([]);
    const prevTimeEntries = usePrevious(timeEntries);

    const getEntriesWithCategory = (entries: timeEntriesType): categoriesByHours => entries.map(entry => ({
        category: entry.task.name,
        hours: entry.hours
    }));

    const getUniqueCategoriesFromEntries = (entries: categoriesByHours) => {
        const categoriesOnlyList = entries.map(entry => entry.category);
        return [...new Set(categoriesOnlyList)];
    };

    const getCategoriesByHoursList = (categories: string[]): categoriesByHours => {
        return categories.map((category) => ({
            category,
            hours: 0
        }));
    };

    const addEntryHoursToCategories = (entriesWithCategory: categoriesByHours, categoriesByHoursList: categoriesByHours) => {
        entriesWithCategory.forEach(entry => {
            categoriesByHoursList.forEach((category) => {
                if (category.category == entry.category) {
                    category.hours += entry.hours;
                }
            });
        });
    }

    const getCategoriesByHours = (entries: timeEntriesType): categoriesByHours => {
        const entriesWithCategory = getEntriesWithCategory(entries);
        const uniqueCategories = getUniqueCategoriesFromEntries(entriesWithCategory);

        let categoriesByHoursList = getCategoriesByHoursList(uniqueCategories);
        addEntryHoursToCategories(entriesWithCategory, categoriesByHoursList);

        return categoriesByHoursList;
    };

    useEffect(() => {
        if ((typeof prevTimeEntries === 'undefined' && typeof timeEntries !== 'undefined') ||
            ((typeof prevTimeEntries !== 'undefined' && typeof timeEntries !== 'undefined') &&
                (JSON.stringify(prevTimeEntries) !== JSON.stringify(timeEntries)))) {
            setCategoriesByHours(getCategoriesByHours(timeEntries));
        }
    });

    return categoriesByHours;
}
