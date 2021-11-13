export type getRequestConfig = {
    access_token: string;
    account_id: string;
};

export type requestConfig = {
    headers: {
        Authorization: string;
        'Harvest-Account-ID': string;
        'Content-Type'?: string;
    };
};
