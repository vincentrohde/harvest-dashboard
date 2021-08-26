// Libs
import { useEffect, useState } from 'react';

// Services
import { backendService } from '@/services/BackendService/BackendService';
import { errorService } from '@/services/ErrorService/ErrorService';

// Types
import { projectsType } from '@/types/Project';

export const useGetProjects = (filterApiData: Function, addProjects: Function) => {
    const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

    const getProjects = () => {
        backendService.getProjects()
            .then((projects: projectsType) => {
                setIsProjectsLoaded(true);
                const filteredProjectsData = filterApiData(projects);
                addProjects(filteredProjectsData);
            }).catch(errorService.handleBasicApiError);
    };

    useEffect(() => {
        if (!isProjectsLoaded) {
            getProjects();
        }
    }, [isProjectsLoaded]);
};
