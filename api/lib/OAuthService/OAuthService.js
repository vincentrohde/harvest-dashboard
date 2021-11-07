const moment = require('moment');
const axios = require('axios');

const HARVEST_API_OAUTH_URL = process.env.HARVEST_API_OAUTH_URL;
const OAUTH_APP_ID = process.env.OAUTH_APP_ID;
const OAUTH_APP_SECRET = process.env.OAUTH_APP_SECRET;
const VERIFICATION_SERVER_URL = process.env.VERIFICATION_SERVER_URL;

// Service for handling everything related to OAuth Data
class OAuthService {
    getOAuthCookieConfig(expires_in) {
        return {
            maxAge: expires_in * 1000, // expires_in is a second value, while maxAge uses miliseconds
        };
    }

    setOAuthCookieData(access_token, refresh_token, account_id, expires_in) {
        return JSON.stringify({
            access_token,
            refresh_token,
            account_id,
            expiration_date: moment().add(expires_in, 'seconds').format('YYYY-MM-DD'),
        });
    }

    getAccountId(scope) {
        return scope.split(':').pop().split(' ')[0];
    }

    // Redirection Server
    getOAuthData(requestToken) {
        return axios
            .get(`${VERIFICATION_SERVER_URL}/oauth/data?requestToken=${requestToken}`)
            .then((response) => {
                const {data} = response;
                return new Promise((resolve) => {
                    resolve(data);
                });
            });
    }

    // Verification Server
    getCredentials(requestToken) {
        return axios
            .post(
                `${HARVEST_API_OAUTH_URL}?code=${requestToken}&client_id=${OAUTH_APP_ID}&client_secret=${OAUTH_APP_SECRET}&grant_type=authorization_code`,
            )
            .then((response) => {
                const {data} = response;
                return new Promise((resolve) => {
                    resolve(data);
                });
            });
    }
}

module.exports = new OAuthService();
