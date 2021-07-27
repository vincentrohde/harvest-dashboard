// Libs
import { useEffect, useState } from 'react';

// Services
import { backendService } from '../../../../lib/BackendService/BackendService';
import { errorService } from '../../../../lib/ErrorService/ErrorService';

// Types
import { projectsType } from '../../../../../interfaces/Project';

export const useGetProjects = (filterApiData: Function, addProjects: Function) => {
    const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);

    const getProjects = () => {
        backendService.getProjects()
            .then((projects: projectsType) => {
                setIsProjectsLoaded(true);
                const filteredProjectsData = filterApiData(projects);
                addProjects({
                    projects: filteredProjectsData
                });
            }).catch(errorService.handleBasicApiError);
    };

    useEffect(() => {
        if (!isProjectsLoaded) {
            getProjects();
        }
    });
};
