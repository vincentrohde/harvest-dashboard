// Typescript
import { timeEntriesType, TimeEntryInterface, TimeEntrySubmissionInterface } from '../../../interfaces/TimeEntry';
import { tasksType } from '../../../interfaces/Task';
import { projectsType } from '../../../interfaces/Project';

// Libs
import axios from 'axios';

class BackendService {
    getTimeEntry (entryID: TimeEntryInterface['id']) {
        return axios.get(`./api/time_entries/${entryID}`);
    }

    getTimeEntries (from: string, to: string) {
        return axios.get(`./api/time_entries?from=${from}&to=${to}`)
            .then((response) => {
                const { timeEntries }: { timeEntries: timeEntriesType } = response.data;
                return timeEntries;
            });
    }

    getTasks () {
        return axios.get('./api/tasks')
            .then((response) => {
                const { tasks }: { tasks: tasksType } = response.data;
                return tasks;
            });
    }

    getProjects () {
        return axios.get('./api/projects')
            .then((response) => {
                const { projects }: { projects: projectsType } = response.data;
                return projects;
            });
    }

    addTimeEntry (timeEntry: TimeEntrySubmissionInterface) {
        return axios.post('./api/time_entries', timeEntry);
    }

    updateTimeEntry (timeEntry: TimeEntrySubmissionInterface, entryID: TimeEntryInterface['id']) {
        return axios.patch(`./api/time_entries/${entryID}`, timeEntry);
    }

    deleteTimeEntry (entryID: TimeEntryInterface['id']) {
        return axios.delete(`./api/time_entries/${entryID}`);
    }
}

export const backendService = new BackendService();