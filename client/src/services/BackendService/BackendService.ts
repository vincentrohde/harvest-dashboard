// Libs
import axios from 'axios';

// Services
import oAuthService from '../OAuthService/OAuthService';

// Types
import {timeEntriesType, TimeEntryInterface, TimeEntrySubmissionInterface} from '@/types/TimeEntry';
import {tasksType} from '@/types/Task';
import {projectsType} from '@/types/Project';
import {requestConfig} from './BackendService.types';

const V2_HARVEST_API_URL = 'https://api.harvestapp.com' + '/v2';
const TIME_ENTRIES_URL = V2_HARVEST_API_URL + '/time_entries';
const TASKS_URL = V2_HARVEST_API_URL + '/tasks';
const PROJECTS_URL = V2_HARVEST_API_URL + '/projects';

class BackendService {
    getAuthorizationConfig(write: boolean = false): Promise<requestConfig> {
        return new Promise((resolve, reject) => {
            const credentials = oAuthService.getOAuthCookieData();

            if (credentials) {
                const config: requestConfig = {
                    headers: {
                        Authorization: 'Bearer ' + credentials.access_token,
                        'Harvest-Account-ID': credentials.account_id,
                    },
                };

                if (write) {
                    config.headers['Content-Type'] = 'application/json';
                }

                resolve(config);
            } else {
                reject('No Credentials. Please authorize.');
            }
        });
    }

    getTimeEntries(from: string | undefined, to: string | undefined) {
        const isParams = typeof from !== 'undefined' && typeof to !== 'undefined';
        const queryString = isParams ? `?from=${from}&to=${to}` : '';

        return this.getAuthorizationConfig()
            .then((config) => {
                return axios.get(TIME_ENTRIES_URL + queryString, config);
            })
            .then((response) => {
                const {timeEntries}: {timeEntries: timeEntriesType} = response.data;
                return timeEntries;
            });
    }

    getTasks() {
        return this.getAuthorizationConfig()
            .then((config) => {
                return axios.get(TASKS_URL, config);
            })
            .then((response) => {
                const {tasks}: {tasks: tasksType} = response.data;
                return tasks;
            });
    }

    getProjects() {
        return this.getAuthorizationConfig()
            .then((config) => {
                return axios.get(PROJECTS_URL, config);
            })
            .then((response) => {
                const {projects}: {projects: projectsType} = response.data;
                return projects;
            });
    }

    getTimeEntry(entryID: TimeEntryInterface['id']) {
        return this.getAuthorizationConfig().then((config) => {
            return axios.get(`${TIME_ENTRIES_URL}/${entryID}`, config);
        });
    }

    addTimeEntry(timeEntry: TimeEntrySubmissionInterface) {
        return this.getAuthorizationConfig(true).then((config) => {
            return axios.post(TIME_ENTRIES_URL, timeEntry, config);
        });
    }

    updateTimeEntry(timeEntry: TimeEntrySubmissionInterface, entryID: TimeEntryInterface['id']) {
        return this.getAuthorizationConfig(true).then((config) => {
            return axios.patch(`${TIME_ENTRIES_URL}/${entryID}`, timeEntry, config);
        });
    }

    deleteTimeEntry(entryID: TimeEntryInterface['id']) {
        return this.getAuthorizationConfig(true).then((config) => {
            return axios.delete(`${TIME_ENTRIES_URL}/${entryID}`, config);
        });
    }
}

const backendService = new BackendService();

export default backendService;
