// Libs
import { useEffect } from 'react';

// Services
import { objectService } from '@/services/ObjectService/ObjectService';
import { backendService } from '@/services/BackendService/BackendService';
import { errorService } from '@/services/ErrorService/ErrorService';

// Hooks
import { usePrevious } from '@hooks/utils/usePrevious/usePrevious';

// Types
import { FiltersInterface } from '../../../../types/Filters';
import { timeEntriesType } from '../../../../types/TimeEntry';

export const useGetTimeEntries = (filters: FiltersInterface, addTimeEntries: Function) => {
    const prevFilters = usePrevious(filters);

    const getDateRange = () => {
        const { dateRange } = filters;

        if (dateRange === 1) {
            return [];
        }

        if (dateRange && dateRange.length) {
            if (dateRange.length > 1) {
                return dateRange;
            } else {
                return [dateRange[0], dateRange[0]];
            }
        }

        return false;
    };

    const getTimeEntries = () => {
        const dateRange = getDateRange();

        if (dateRange) {
            const from = dateRange[0];
            const to = dateRange[1];
            backendService.getTimeEntries(from, to)
                .then((timeEntries: timeEntriesType) => {
                    addTimeEntries(timeEntries);
                })
                .catch(errorService.handleBasicApiError);
        }
    }

    useEffect(() => {
        if (!objectService.isEmptyObject(filters)) {
            if (objectService.isNewObjectDifferent(prevFilters, filters)) {
                getTimeEntries();
            }
        }
    });
};
