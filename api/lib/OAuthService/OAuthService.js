const moment = require('moment');
const expressErrorService = require('../ExpressErrorService/ExpressErrorService');

// Service for handling everything related to OAuth Data

class OAuthService {
    handleHarvestRequest(req, res, success) {
        const credentials = this.getOAuthCookieData(req);

        if (credentials) {
            const config = this.getRequestConfig(credentials);
            success(config);
        } else {
            expressErrorService.sendReadOnlyErrorResponse(res);
        }
    }

    getRequestConfig({access_token, account_id}) {
        return {
            headers: {
                Authorization: 'Bearer ' + access_token,
                'Harvest-Account-ID': account_id,
            },
        };
    }

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

    getOAuthCookieData(req) {
        if (req.cookies.oauth) {
            const parsedCookie = JSON.parse(req.cookies.oauth);
            const {access_token, account_id} = parsedCookie;

            return {
                access_token,
                account_id,
            };
        }

        return false;
    }

    getAccountId(scope) {
        return scope.split(':').pop().split(' ')[0];
    }
}

module.exports = new OAuthService();
