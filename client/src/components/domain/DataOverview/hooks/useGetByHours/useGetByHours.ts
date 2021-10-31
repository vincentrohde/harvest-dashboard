// Services
import tasksSortService from '@/services/TasksSortService/TasksSortService';
import projectsSortService from '@/services/ProjectsSortService/ProjectsSortService';

// Types
import {getByHours} from './useGetByHours.types';
import {group} from '../../DataOverview.types';

export const useGetByHours = (group: group) => {
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
};
