// Types
import {groupLabel} from './useGroupLabel.types';
import {group} from '../../DataOverview.types';

export const useGroupLabel = (group: group) => {
    let groupLabel: groupLabel;

    switch (group) {
        case 'tasks':
            groupLabel = 'task';
            break;
        case 'projects':
            groupLabel = 'project';
            break;
        default:
            groupLabel = 'task';
    }

    return groupLabel;
};
