// Libs
import Cookies from 'js-cookie';
import Router from 'next/router';
import jwt_decode from 'jwt-decode';

// Types
import {oAuthData} from './OAuthService.types';

class OAuthService {
    getAccountId(scope: string) {
        // @ts-ignore
        return scope.split(':').pop().split(' ')[0];
    }

    getOAuthCookieData() {
        const credentials = this.getCredentialsCookie();
        if (credentials) {
            const {access_token, account_id} = jwt_decode(credentials) as oAuthData;

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

    getCredentialsParams(): oAuthData | false {
        const urlParams = new URLSearchParams(window.location.search);
        const access_token = urlParams.get('access_token');
        const scope = urlParams.get('scope');
        const account_id = scope ? this.getAccountId(scope) : null;

        let credentials = null;

        if (access_token && account_id) {
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
