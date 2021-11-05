// Libs
import Cookies from 'js-cookie';
import {oAuthType} from '@/types/OAuth';

class OAuthService {
    getOAuthCookieData() {
        const cookie = this.getOAuthCookie();
        if (cookie) {
            const {access_token, account_id} = cookie;

            return {
                access_token,
                account_id,
            };
        }

        return false;
    }

    getOAuthCookie(): oAuthType | false {
        return JSON.parse(Cookies.get('oauth') || 'false');
    }
}

const oAuthService = new OAuthService();

export default oAuthService;
