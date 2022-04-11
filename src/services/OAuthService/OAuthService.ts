// Libs
import Cookies from 'js-cookie';
import Router from 'next/router';
import jwt_decode from 'jwt-decode';

class OAuthService {
    getAccountId(scope: string) {
        // @ts-ignore
        return scope.split(':').pop().split(' ')[0];
    }

    getOAuthCookieData() {
        const credentials = this.getCredentialsCookie();
        if (credentials) {
            const {access_token, account_id}: {access_token: string, account_id: string} = jwt_decode(credentials);

            return {
                access_token,
                account_id,
            };
        }

        return false;
    }

    setCredentialsCookie(credentials: string) {
        return Cookies.set('credentials', credentials, {expires: 13});
    }

    getCredentialsCookie() {
        return Cookies.get('credentials') || false;
    }

    getCredentialsParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const access_token = urlParams.get('access_token');
        const expires_in = urlParams.get('expires_in');
        const scope = urlParams.get('scope');
        const account_id = scope ? this.getAccountId(scope) : null;

        let credentials = null;

        if (access_token && account_id && expires_in) {
            credentials = {
                access_token,
                account_id
            };
        }

        return credentials ? credentials : false;
    }

    deleteCredentialsParamsFromUrl() {
        Router.push('/');
    }
}

const oAuthService = new OAuthService();

export default oAuthService;
