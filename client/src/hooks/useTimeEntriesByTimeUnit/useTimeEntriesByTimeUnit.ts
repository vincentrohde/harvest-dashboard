// Libs
import { useState, useEffect } from 'react';

// Services
import { timeService } from '@/services/TimeService/TimeService';

// Types
import { timeEntriesType } from '@/types/TimeEntry';
import { timeUnit } from '@/services/TimeService/TimeService.types';

export const useTimeEntriesByTimeUnit = (timeEntries: timeEntriesType | undefined, timeUnit: timeUnit) => {
    const [sortedTimeEntries, setSortedTimeEntries] = useState<timeEntriesType[]>([]);

    // Sorts time entries by day (oldest to newest)
    const getSortedTimeEntries = (timeEntries: timeEntriesType) => {
        let sortedEntries: timeEntriesType = [...timeEntries];

        sortedEntries.sort((a, b) => {
            return timeService.compareByTimeUnit(a.spent_date, b.spent_date, 'day');
        });

        return sortedEntries;
    };

    const sortTimeEntriesByTimeUnit = () => {
        if (typeof timeEntries === 'undefined') { return; }

        const newSortedTimeEntries = getSortedTimeEntries(timeEntries);
        let timeEntriesGrouped: timeEntriesType[] = [];

        newSortedTimeEntries.forEach((entry) => {
            let isAdded = false;

            // if empty list, add first item
            if (timeEntriesGrouped.length === 0) {
                timeEntriesGrouped.push([entry]);
                return;
            }

            for (let i = 0; i < timeEntriesGrouped.length; i++) {
                if (!isAdded) {
                    const firstGroupedEntry = timeEntriesGrouped[i][0];
                    const isSameDateRange = timeService.isSameDateRange(entry.spent_date, firstGroupedEntry.spent_date, timeUnit);
                    const isLastGroup = i === timeEntriesGrouped.length - 1;

                    if (isSameDateRange) {
                        timeEntriesGrouped[i].push(entry);
                        isAdded = true;
                        return;
                    }

                    if (isLastGroup && !isSameDateRange) {
                        timeEntriesGrouped.push([entry]);
                        isAdded = true;
                    }
                }
            }
        });

        setSortedTimeEntries(timeEntriesGrouped);
    }

    useEffect(() => {
        sortTimeEntriesByTimeUnit();
    }, [timeEntries, timeUnit]);

    return sortedTimeEntries;
};
