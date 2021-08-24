import { useState, useEffect } from 'react';

// Services
import { tasksSortService } from '../../lib/TasksSortService/TasksSortService';

// Hooks
import { useIsNewStateDifferent } from '../useIsNewStateDifferent/useIsNewStateDifferent';

// Types
import { timeEntriesType } from '../../types/TimeEntry';
import { tasksByHours } from '../../types/Task';

export const useTasksByHours = (timeEntries: timeEntriesType | undefined) => {
    const [tasksByHours, setTasksByHours] = useState<tasksByHours>([]);
    const isNewStateDifferent = useIsNewStateDifferent(timeEntries);

    useEffect(() => {
        if (isNewStateDifferent) {
            // @ts-ignore
            setTasksByHours(tasksSortService.getTasksByHours(timeEntries));
        }
    }, [timeEntries]);

    return tasksByHours;
}
