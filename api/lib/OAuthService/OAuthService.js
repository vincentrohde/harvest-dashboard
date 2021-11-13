const axios = require('axios');

const HARVEST_API_OAUTH_URL = process.env.HARVEST_API_OAUTH_URL;
const OAUTH_APP_ID = process.env.OAUTH_APP_ID;
const OAUTH_APP_SECRET = process.env.OAUTH_APP_SECRET;

// Service for handling everything related to OAuth Data
class OAuthService {
    getAccountId(scope) {
        return scope.split(':').pop().split(' ')[0];
    }

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
