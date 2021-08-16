// Libs
import { useState, useEffect } from 'react';

// Hooks
import { useIsNewStateDifferent } from '../useIsNewStateDifferent/useIsNewStateDifferent';

// Services
import { timeService } from '../../lib/TimeService/TimeService';

// Types
import { timeEntriesType } from '../../../interfaces/TimeEntry';
import { timeUnit } from '../../lib/TimeService/TimeService.types';

export const useTimeEntriesByTimeUnit = (timeEntries: timeEntriesType | undefined, timeUnit: timeUnit) => {
    const [sortedTimeEntries, setSortedTimeEntries] = useState<timeEntriesType[]>([]);
    const isTimeEntriesDifferent = useIsNewStateDifferent(timeEntries);

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
        if (isTimeEntriesDifferent) {
            sortTimeEntriesByTimeUnit();
        }
    }, [timeEntries, timeUnit]);

    return sortedTimeEntries;
};
