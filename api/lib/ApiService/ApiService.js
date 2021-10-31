require('dotenv').config();

const axios = require('axios');

// Configs

const getUpdateConfig = (config) => {
    return {
        headers: {
            ...config.headers,
            'Content-Type': 'application/json',
        },
    };
};

// URLs for different requests

const V2_HARVEST_API_URL = process.env.HARVEST_API_URL + '/v2';
const TIME_ENTRIES_URL = V2_HARVEST_API_URL + '/time_entries';
const TASKS_URL = V2_HARVEST_API_URL + '/tasks';
const PROJECTS_URL = V2_HARVEST_API_URL + '/projects';

// OAuth URLs

const OAUTH_URL = 'https://id.getharvest.com/api/v2/oauth2/token';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

class ApiService {
    addTimeEntry(config, timeEntry) {
        return axios.post(TIME_ENTRIES_URL, timeEntry, getUpdateConfig(config));
    }

    deleteTimeEntry(config, entryID) {
        return axios.delete(`${TIME_ENTRIES_URL}/${entryID}`, getUpdateConfig(config));
    }

    updateTimeEntry(config, timeEntry, entryID) {
        return axios.patch(`${TIME_ENTRIES_URL}/${entryID}`, timeEntry, getUpdateConfig(config));
    }

    getTimeEntry(config, entryID) {
        return axios.get(`${TIME_ENTRIES_URL}/${entryID}`, config);
    }

    getAccessTokenFromOAuth(code) {
        return axios
            .post(
                `${OAUTH_URL}?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code`,
            )
            .then((response) => {
                const {data} = response;
                return new Promise((resolve) => {
                    resolve(data);
                });
            });
    }

    getTimeEntries(config, from, to) {
        const isParams = typeof from !== 'undefined' && from && typeof to !== 'undefined' && to;
        const queryString = isParams ? `?from=${from}&to=${to}` : '';

        return axios.get(TIME_ENTRIES_URL + queryString, config).then((response) => {
            const {time_entries} = response.data;
            return new Promise((resolve) => {
                resolve(time_entries);
            });
        });
    }

    getTasks(config) {
        return axios.get(TASKS_URL, config).then((response) => {
            const {tasks} = response.data;
            return new Promise((resolve) => {
                resolve(tasks);
            });
        });
    }

    getProjects(config) {
        return axios.get(PROJECTS_URL, config).then((response) => {
            const {projects} = response.data;
            return new Promise((resolve) => {
                resolve(projects);
            });
        });
    }
}

module.exports = new ApiService();
