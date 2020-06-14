import axios from 'axios';

class BackendService {
    getTimeEntry (entryID) {
        return axios.get(`/api/time_entries/${entryID}`);
    }

    getTimeEntries (from, to) {
        return axios.get(`/api/time_entries?from=${from}&to=${to}`)
            .then((response) => {
                const { timeEntries } = response.data;
                return new Promise ((resolve) => {
                    resolve(timeEntries);
                })
            })
            .catch((error) => console.log(error));
    }

    getTasks () {
        return axios.get('/api/tasks')
            .then((response) => {
                const { tasks } = response.data;
                return new Promise((resolve) => {
                    resolve(tasks)
                });
            })
            .catch((error) => console.log(error));
    }

    getProjects () {
        return axios.get('/api/projects')
            .then((response) => {
                const { projects } = response.data;
                return new Promise((resolve) => {
                    resolve(projects);
                });
            })
            .catch((error) => console.log(error));
    }

    addTimeEntry (timeEntry) {
        return axios.post('/api/time_entries', timeEntry);
    }

    updateTimeEntry (timeEntry, entryID) {
        return axios.patch(`/api/time_entries/${entryID}`, timeEntry);
    }

    deleteTimeEntry (entryID) {
        return axios.delete(`/api/time_entries/${entryID}`);
    }
}

export const backendService = new BackendService();