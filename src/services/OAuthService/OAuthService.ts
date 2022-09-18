// Libs
import Cookies from 'js-cookie';
import Router from 'next/router';
import jwt_decode from 'jwt-decode';
import { sign } from 'jsonwebtoken';

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
            const {access_token, account_id} = jwt_decode<oAuthData>(credentials);

            return {
                access_token,
                account_id,
            };
        }

        return undefined;
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

    // This method is also used by Cypress, to generate cookies,
    // when executing E2E tests
    getSignedJwt(data: oAuthData) {
        return sign(data, 'harvest-dashboard');
    }
}

const oAuthService = new OAuthService();

export default oAuthService;
