require('dotenv').config();

const axios = require('axios');

// Configs

const requestConfig = {
    headers: {
        Authorization: 'Bearer ' + process.env.ACCESS_TOKEN,
        'Harvest-Account-ID': process.env.ACCOUNT_ID,
    },
};

const updateConfig = {
    headers: {
        ...requestConfig.headers,
        'Content-Type': 'application/json',
    },
};

// URLs for different requests

const V2_HARVEST_API_URL = process.env.HARVEST_API_URL + '/v2';
const TIME_ENTRIES_URL = V2_HARVEST_API_URL + '/time_entries';
const TASKS_URL = V2_HARVEST_API_URL + '/tasks';
const PROJECTS_URL = V2_HARVEST_API_URL + '/projects';

class ApiService {
    addTimeEntry(timeEntry) {
        return axios.post(TIME_ENTRIES_URL, timeEntry, updateConfig);
    }

    deleteTimeEntry(entryID) {
        return axios.delete(`${TIME_ENTRIES_URL}/${entryID}`, updateConfig);
    }

    updateTimeEntry(timeEntry, entryID) {
        return axios.patch(`${TIME_ENTRIES_URL}/${entryID}`, timeEntry, updateConfig);
    }

    getTimeEntry(entryID) {
        return axios.get(`${TIME_ENTRIES_URL}/${entryID}`, requestConfig);
    }

    getTimeEntries(from, to) {
        const isParams = typeof from !== 'undefined' && from && typeof to !== 'undefined' && to;
        const queryString = isParams ? `?from=${from}&to=${to}` : '';

        return axios.get(TIME_ENTRIES_URL + queryString, requestConfig).then((response) => {
            const {time_entries} = response.data;
            return new Promise((resolve) => {
                resolve(time_entries);
            });
        });
    }

    getTasks() {
        return axios.get(TASKS_URL, requestConfig).then((response) => {
            const {tasks} = response.data;
            return new Promise((resolve) => {
                resolve(tasks);
            });
        });
    }

    getProjects() {
        return axios.get(PROJECTS_URL, requestConfig).then((response) => {
            const {projects} = response.data;
            return new Promise((resolve) => {
                resolve(projects);
            });
        });
    }
}

module.exports = new ApiService();
