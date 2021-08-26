// Libs
import { useEffect, useState } from 'react';

// Services
import { backendService } from '@/services/BackendService/BackendService';
import { errorService } from '@/services/ErrorService/ErrorService';

// Types
import { tasksType } from '../../../../types/Task';

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
    }, [isTasksLoaded]);
};
