// Libs
import { useEffect } from 'react';
import moment from 'moment';

// Hooks
import { usePrevious } from '@/hooks/utils/usePrevious/usePrevious';

// Services
import { timeService } from '@/services/TimeService/TimeService';

// Types
import { FiltersInterface } from '../../../../types/Filters';

export const usePresetDateRange = (preset: string, action: Function) => {
    const currentDay = moment().format('DD-MM-YYYY');
    const prevPreset = usePrevious(preset);

    const getPresetStartDate = () => {
        switch (preset) {
            case 'today':
                return currentDay;
            case 'one-week':
                return timeService.getDateFromDaysAgo(6);
            case 'one-month':
                return timeService.getDateFromDaysAgo(29);
            case 'one-year':
                return timeService.getDateFromDaysAgo(364);
            case 'all':
                return 'all';
            default:
                return '';
        }
    };

    const getPresetDateRange: () => FiltersInterface['dateRange'] = () => {
        const startDate = getPresetStartDate();

        if (startDate === 'all') {
            return 1;
        }

        if (startDate !== currentDay && startDate.length > 0) {
            return [startDate, currentDay];
        } else {
            return [currentDay];
        }
    };

    useEffect(() => {
        if (prevPreset !== preset) {
            const presetDateRange = getPresetDateRange();
            action(presetDateRange);
        }
    });
}
