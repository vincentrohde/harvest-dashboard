require('dotenv').config({path: '../.env'});

const express = require('express');
const cookieParser = require('cookie-parser');
const apiService = require('../lib/ApiService/ApiService');
const expressErrorService = require('../lib/ExpressErrorService/ExpressErrorService');
const oAuthService = require('../lib/OAuthService/OAuthService');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());
app.use(cookieParser());

// Handle OAuth Authentification Redirect
app.get('/oauth/redirect', (req, res) => {
    const requestToken = req.query.code;
    const requestScope = req.query.scope;
    const account_id = oAuthService.getAccountId(requestScope);

    apiService
        .getOAuthData(requestToken)
        .then(({access_token, refresh_token, expires_in}) => {
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

app.listen(5000, () => console.log(`App listening on port 5000`));
