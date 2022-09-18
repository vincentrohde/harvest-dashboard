export type requestConfig = {
    headers: {
        Authorization: string;
        'Harvest-Account-ID': string;
    };
};

export type oAuthData = {
    access_token: string;
    account_id: string;
};
