require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const apiService = require('./lib/ApiService/ApiService');
const expressErrorService = require('./lib/ExpressErrorService/ExpressErrorService');
const oAuthService = require('./lib/OAuthService/OAuthService');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());
app.use(cookieParser());

// Handle OAuth Redirect
app.get('/oauth/redirect', (req, res) => {
    const requestToken = req.query.code;
    const requestScope = req.query.scope;
    const account_id = oAuthService.getAccountId(requestScope);

    apiService
        .getAccessTokenFromOAuth(requestToken)
        .then(({access_token, refresh_token, token_type, expires_in}) => {
            const cookieData = oAuthService.setOAuthCookieData(
                access_token,
                refresh_token,
                account_id,
                expires_in,
            );
            const cookieConfig = oAuthService.getOAuthCookieConfig(expires_in);
            res.cookie('oauth', cookieData, cookieConfig);
            res.redirect(CLIENT_URL);
        })
        .catch((error) => expressErrorService.sendErrorResponse(error, res));
});

// Get Time Entries
app.get('/time_entries', (req, res) => {
    oAuthService.handleHarvestRequest(req, res, (config) => {
        const from = req.query.from || false;
        const to = req.query.to || false;

        apiService
            .getTimeEntries(config, from, to)
            .then((timeEntries) => res.json({timeEntries}))
            .catch((error) => expressErrorService.sendErrorResponse(error, res));
    });
});

// Get Tasks
app.get('/tasks', (req, res) => {
    oAuthService.handleHarvestRequest(req, res, (config) => {
        apiService
            .getTasks(config)
            .then((tasks) => res.json({tasks}))
            .catch((error) => expressErrorService.sendErrorResponse(error, res));
    });
});

// Get Projects
app.get('/projects', (req, res) => {
    oAuthService.handleHarvestRequest(req, res, (config) => {
        apiService
            .getProjects(config)
            .then((projects) => res.json({projects}))
            .catch((error) => {
                expressErrorService.sendErrorResponse(error, res);
            });
    });
});

// Add Time Entry
app.post('/time_entries', (req, res) => {
    oAuthService.handleHarvestRequest(req, res, (config) => {
        const {body: entry} = req;
        apiService
            .addTimeEntry(config, entry)
            .then(({data}) => res.json(data))
            .catch((error) => expressErrorService.sendErrorResponse(error, res));
    });
});

// Update Time Entry
app.patch('/time_entries/:entryId', ({params, body: timeEntry}, res) => {
    oAuthService.handleHarvestRequest(req, res, (config) => {
        const {entryId} = params;
        apiService
            .updateTimeEntry(config, timeEntry, entryId)
            .then(({data}) => res.json(data))
            .catch((error) => expressErrorService.sendErrorResponse(error, res));
    });
});

// Remove Time Entry
app.delete('/time_entries/:entryId', ({params}, res) => {
    oAuthService.handleHarvestRequest(req, res, (config) => {
        const {entryId} = params;

        apiService
            .deleteTimeEntry(config, entryId)
            .then(() => res.sendStatus(200))
            .catch((error) => expressErrorService.sendErrorResponse(error, res));
    });
});

app.listen(process.env.PORT || 3000, () =>
    console.log(`App listening on port ${process.env.PORT || 3000}`),
);
