import { useState, useEffect } from 'react';

// Services
import { projectsSortService } from '@/services/ProjectsSortService/ProjectsSortService';

// Hooks
import { useIsNewStateDifferent } from '@hooks/useIsNewStateDifferent/useIsNewStateDifferent';

// Types
import { timeEntriesType } from '../../types/TimeEntry';
import { projectsByHours } from '../../types/Project';

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
