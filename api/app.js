require('dotenv').config({path: '../.env'});

const express = require('express');
const jwt = require('jsonwebtoken');
const expressErrorService = require('./lib/ExpressErrorService/ExpressErrorService');
const oAuthService = require('./lib/OAuthService/OAuthService');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT || process.env.SERVER_PORT || 8080;

app.use(express.json());

// Handle OAuth Authentification Redirect
app.get('/oauth/redirect', (req, res) => {
    const requestToken = req.query.code;
    const requestScope = req.query.scope;
    const account_id = oAuthService.getAccountId(requestScope);

    oAuthService
        .getCredentials(requestToken)
        .then(({access_token, refresh_token, expires_in}) => {
            const token = jwt.sign(
                {
                    access_token,
                    refresh_token,
                    account_id,
                    expires_in,
                },
                'harvest-dashboard',
            );

            res.redirect(`${CLIENT_URL}?token=${token}`);
        })
        .catch((error) => expressErrorService.sendErrorResponse(error, res));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
