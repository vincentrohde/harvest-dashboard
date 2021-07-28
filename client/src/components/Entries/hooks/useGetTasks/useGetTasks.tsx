// Libs
import { useEffect, useState } from 'react';

// Services
import { backendService } from '../../../../lib/BackendService/BackendService';
import { errorService } from '../../../../lib/ErrorService/ErrorService';

// Types
import { tasksType } from '../../../../../interfaces/Task';

export const useGetTasks = (filterApiData: Function, addTasks: Function) => {
    const [isTasksLoaded, setIsTasksLoaded] = useState(false);

    const getTasks = () => {
        backendService.getTasks()
            .then((tasks: tasksType) => {
                setIsTasksLoaded(true);
                const filteredTasksData = filterApiData(tasks);
                addTasks(filteredTasksData);
            }).catch(errorService.handleBasicApiError);
    };

    useEffect(() => {
        if (!isTasksLoaded) {
            getTasks();
        }
    });
};
