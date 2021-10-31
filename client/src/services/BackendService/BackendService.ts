// Libs
import axios from 'axios';

// Types
import {timeEntriesType, TimeEntryInterface, TimeEntrySubmissionInterface} from '@/types/TimeEntry';
import {tasksType} from '@/types/Task';
import {projectsType} from '@/types/Project';

class BackendService {
    getTimeEntry(entryID: TimeEntryInterface['id']) {
        return axios.get(`./api/time_entries/${entryID}`);
    }

    getTimeEntries(from: string | undefined, to: string | undefined) {
        const isParams = typeof from !== 'undefined' && typeof to !== 'undefined';
        const queryString = isParams ? `?from=${from}&to=${to}` : '';

        return axios.get('./api/time_entries' + queryString).then((response) => {
            const {timeEntries}: {timeEntries: timeEntriesType} = response.data;
            return timeEntries;
        });
    }

    getTasks() {
        return axios.get('./api/tasks').then((response) => {
            const {tasks}: {tasks: tasksType} = response.data;
            return tasks;
        });
    }

    getProjects() {
        return axios.get('./api/projects').then((response) => {
            const {projects}: {projects: projectsType} = response.data;
            return projects;
        });
    }

    addTimeEntry(timeEntry: TimeEntrySubmissionInterface) {
        return axios.post('./api/time_entries', timeEntry);
    }

    updateTimeEntry(timeEntry: TimeEntrySubmissionInterface, entryID: TimeEntryInterface['id']) {
        return axios.patch(`./api/time_entries/${entryID}`, timeEntry);
    }

    deleteTimeEntry(entryID: TimeEntryInterface['id']) {
        return axios.delete(`./api/time_entries/${entryID}`);
    }
}

const backendService = new BackendService();

export default backendService;
