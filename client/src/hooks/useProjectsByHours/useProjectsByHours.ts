import { useState, useEffect } from 'react';

// Services
import { projectsSortService } from '../../lib/ProjectsSortService/ProjectsSortService';

// Hooks
import { useIsNewStateDifferent } from '../useIsNewStateDifferent/useIsNewStateDifferent';

// Types
import { timeEntriesType } from '../../../interfaces/TimeEntry';
import { projectsByHours } from '../../../interfaces/Project';

export const useTasksByHours = (timeEntries: timeEntriesType | undefined) => {
    const [projectsByHours, setTasksByHours] = useState<projectsByHours>([]);
    const isNewStateDifferent = useIsNewStateDifferent(timeEntries);

    useEffect(() => {
        if (isNewStateDifferent) {
            // @ts-ignore
            setTasksByHours(projectsSortService.getProjectsByHours(timeEntries));
        }
    }, [timeEntries]);

    return projectsByHours;
}
