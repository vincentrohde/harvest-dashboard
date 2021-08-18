// Libs
import { useState, useEffect } from 'react';

// Services
import { tasksSortService } from '../../../../lib/TasksSortService/TasksSortService';
import { projectsSortService } from '../../../../lib/ProjectsSortService/ProjectsSortService';

// Types
import { getByHours } from './useGetByHours.types';
import { group } from '../../DataOverviewContainer.types';

export const useGetByHours = (group: group) => {
    const [getByHours, setGetByHours] = useState<getByHours>();

    const getGetByHours = () => {
        let getByHours: getByHours;

        switch (group) {
            case 'tasks':
                getByHours = tasksSortService.getTasksByHours.bind(tasksSortService);
                break;
            case 'projects':
                getByHours = projectsSortService.getProjectsByHours.bind(projectsSortService);
                break;
            default:
                getByHours = tasksSortService.getTasksByHours.bind(tasksSortService);
                break;
        }

        return getByHours;
    }

    useEffect(() => {
        setGetByHours(getGetByHours())
    }, [group]);

    return getByHours;
};
