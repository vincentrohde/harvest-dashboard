import { FiltersInterface } from '../../../interfaces/Filters';

export interface AppProps {
    filters: FiltersInterface;
    addTimeEntries: Function;
    addProjects: Function;
    addTasks: Function;
}
