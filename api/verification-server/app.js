require('dotenv').config({path: '../.env'});

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const oAuthService = require('../lib/OAuthService/OAuthService');
const expressErrorService = require('../lib/ExpressErrorService/ExpressErrorService');

const PORT = process.env.PORT || process.env.VERIFICATION_SERVER_PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());

// Handle OAuth Access Token Requests
app.get('/oauth/data', cors(), (req, res) => {
    const requestToken = req.query.requestToken;

    oAuthService
        .getCredentials(requestToken)
        .then(({access_token, refresh_token, expires_in}) => {
            res.send({
                access_token,
                refresh_token,
                expires_in,
            });
        })
        .catch((error) => expressErrorService.sendErrorResponse(error, res));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
