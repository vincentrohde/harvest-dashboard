// Types
import { oAuthData } from '@/services/OAuthService/OAuthService.types';

export type requestConfig = {
    headers: {
        Authorization: string;
        'Harvest-Account-ID': string;
        'Content-Type'?: string;
    };
};

export type requestConfigInput = {
    write?: boolean,
    credentials?: oAuthData
}

export type apiOptions = Pick<requestConfigInput, 'credentials'>;
