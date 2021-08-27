import { FiltersInterface } from '@/types/Filters';

export interface AppProps {
    filters: FiltersInterface;
    addTimeEntries: Function;
    addProjects: Function;
    addTasks: Function;
}
