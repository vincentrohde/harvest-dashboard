// Libs
import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';

export const useOAuthCredentials = () => {
    const [isOAuthCredentials, setIsOAuthCredentials] = useState(false);

    const getCredentials = () => {
        const oAuthCookie = Cookies.get('oauth');

        if (typeof oAuthCookie !== 'undefined') {
            const parsedOAuthCookie = JSON.parse(oAuthCookie);
            const {access_token, refresh_token, account_id} = parsedOAuthCookie;

            if (
                typeof access_token !== 'undefined' &&
                typeof refresh_token !== 'undefined' &&
                typeof account_id !== 'undefined'
            ) {
                setIsOAuthCredentials(true);
            }
        }
    };

    useEffect(() => {
        if (!isOAuthCredentials) {
            getCredentials();
        }
    }, [isOAuthCredentials]);

    return isOAuthCredentials;
};
