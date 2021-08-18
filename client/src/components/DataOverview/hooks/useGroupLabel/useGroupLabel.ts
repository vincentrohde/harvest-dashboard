// Libs
import { useState, useEffect } from 'react';

// Types
import { groupLabel } from './useGroupLabel.types';
import { group } from '../../DataOverviewContainer.types';

export const useGroupLabel = (group: group) => {
    const [groupLabel, setGroupLabel] = useState<groupLabel>('task');

    const getGroupLabel = () => {
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
    }

    useEffect(() => {
        setGroupLabel(getGroupLabel())
    }, [group]);

    return groupLabel;
};
