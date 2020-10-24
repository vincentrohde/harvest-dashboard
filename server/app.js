const path = require('path');
const express = require('express');
const apiService = require('./lib/ApiService/ApiService');
const expressErrorService = require('./lib/ExpressErrorService/ExpressErrorService');

const app = express();
const port = 8080;

app.use(express.json());

// Get Time Entries
app.get('/api/time_entries', (req, res) => {
    const from = req.query.from || false;
    const to = req.query.to || false;

    apiService.getTimeEntries(from, to)
        .then((timeEntries) => res.json({ timeEntries }))
        .catch((error) => expressErrorService.sendErrorResponse(error, res));
});

// Get Tasks
app.get('/api/tasks', (req, res) => {
    apiService.getTasks()
        .then((tasks) => res.json({ tasks }))
        .catch((error) => expressErrorService.sendErrorResponse(error, res));
});

// Get Projects
app.get('/api/projects', (req, res) => {
    apiService.getProjects()
        .then((projects) => res.json({ projects }))
        .catch((error) => expressErrorService.sendErrorResponse(error, res));
});

// Add Time Entry
app.post('/api/time_entries', (req, res) => {
    console.log('### ', req.body);
    res.json('success');
});

// Update Time Entry
app.patch('/api/time_entries/:entryId', ({ params, body: timeEntry }, res) => {
    const { entryId } = params;

    apiService.updateTimeEntry(timeEntry, entryId)
        .then(({ data }) => res.json(data))
        .catch((error) => expressErrorService.sendErrorResponse(error, res));
});

// Remove Time Entry
app.delete('/api/time_entries/:entryId', ({ params }, res) => {
    const { entryId } = params;

    apiService.deleteTimeEntry(entryId)
        .then(() => res.sendStatus(200))
        .catch((error) => expressErrorService.sendErrorResponse(error, res));
});

app.listen(port, () => console.log(`App listening on port ${port}`));