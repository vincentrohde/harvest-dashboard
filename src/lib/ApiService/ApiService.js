import axios from "axios";

const requestConfig = {
    headers: {
        'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN,
        'Harvest-Account-ID': process.env.ACCOUNT_ID
    }
};

const TIME_ENTRIES_URL = process.env.API_URL + '/time_entries';
const TASKS_URL = process.env.API_URL + '/tasks';
const PROJECTS_URL = process.env.API_URL + '/projects';

class ApiService {
    getTimeEntries (from, to) {
        return axios.get(TIME_ENTRIES_URL + `?from=${from}&to=${to}`, requestConfig)
            .then((response) => {
                const { time_entries } = response.data;
                return new Promise ((resolve) => {
                    resolve(time_entries);
                })
            })
            .catch((error) => console.log(error));
    }

    getTasks () {
        return axios.get(TASKS_URL, requestConfig)
            .then((response) => {
                const { tasks } = response.data;
                return new Promise((resolve) => {
                    resolve(tasks)
                });
            })
            .catch((error) => console.log(error));
    }
    getProjects () {
        return axios.get(PROJECTS_URL, requestConfig)
            .then((response) => {
                const { projects } = response.data;
                return new Promise((resolve) => {
                    resolve(projects);
                });
            })
            .catch((error) => console.log(error));
    }
}

export const apiService = new ApiService();