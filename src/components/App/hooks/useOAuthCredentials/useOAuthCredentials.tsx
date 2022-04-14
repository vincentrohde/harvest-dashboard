// Libs
import {useEffect, useState} from 'react';
import jwt from 'jsonwebtoken';

// Services
import oAuthService from '@/services/OAuthService/OAuthService';

export const useOAuthCredentials = () => {
    const [isOAuthCredentials, setIsOAuthCredentials] = useState(false);

    const getCredentials = () => {
        const credentialsCookie = oAuthService.getCredentialsCookie();

        if (!credentialsCookie) {
            const credentialsFromParams = oAuthService.getCredentialsParams();

            if (credentialsFromParams) {
                const credentials = jwt.sign(
                    credentialsFromParams,
                    'harvest-dashboard',
                );

                oAuthService.setCredentialsCookie(credentials);
                oAuthService.deleteCredentialsParamsFromUrl();
                setIsOAuthCredentials(true);
            }

            return;
        } else {
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
