// Libs
import {useEffect, useState} from 'react';
import oAuthService from '@/services/OAuthService/OAuthService';

export const useOAuthCredentials = () => {
    const [isOAuthCredentials, setIsOAuthCredentials] = useState(false);

    const getCredentials = () => {
        const tokenCookie = oAuthService.getTokenCookie();

        if (!tokenCookie) {
            const tokenFromParam = oAuthService.getTokenParam();

            if (tokenFromParam) {
                oAuthService.setTokenCookie(tokenFromParam);
                oAuthService.deleteTokenParamFromUrl();
                setIsOAuthCredentials(true);
            }

            return;
        }

        if (tokenCookie) {
            setIsOAuthCredentials(true);
        }
    };

    useEffect(() => {
        if (!isOAuthCredentials) {
            getCredentials();
        }
    }, [isOAuthCredentials]);

    return isOAuthCredentials;
};
