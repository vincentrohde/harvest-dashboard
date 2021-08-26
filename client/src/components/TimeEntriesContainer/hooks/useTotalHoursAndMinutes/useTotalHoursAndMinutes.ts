// Libs
import { useEffect, useState } from 'react';

// Services
import { timeService } from '@/services/TimeService/TimeService';

// Types
import { timeEntriesType } from '../../../../types/TimeEntry';

export const useTotalHoursAndMinutes = (timeEntries: timeEntriesType) => {
    const [totalHoursAndMinutes, setTotalHoursAndMinutes] = useState('0:00');

    const getTimeEntriesTotalMinutes = () => {
        let totalMinutes = 0;
        timeEntries.forEach(item => totalMinutes += timeService.hoursToMinutes(item.hours));
        return totalMinutes;
    }

    const getTotalHoursAndMinutes = () => {
        const timeEntriesTotalMinutes = getTimeEntriesTotalMinutes();
        return timeService.minutesToHoursAndMinutes(timeEntriesTotalMinutes);
    };

    useEffect(() => {
        setTotalHoursAndMinutes(getTotalHoursAndMinutes());
    }, [timeEntries]);

    return totalHoursAndMinutes;
};
