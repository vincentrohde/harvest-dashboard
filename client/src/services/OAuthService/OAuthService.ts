// Libs
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

class OAuthService {
    getOAuthCookieData() {
        const token = this.getTokenCookie();
        if (token) {
            const {access_token, account_id} = jwt_decode(token);

            return {
                access_token,
                account_id,
            };
        }

        return false;
    }

    setTokenCookie(token: string) {
        return Cookies.set('token', token, {expires: 13});
    }

    getTokenCookie() {
        return Cookies.get('token') || false;
    }

    getTokenParam() {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        return tokenParam ? tokenParam : false;
    }

    deleteTokenParamFromUrl() {
        window.history.pushState({}, document.title, window.location.pathname);
    }
}

const oAuthService = new OAuthService();

export default oAuthService;
