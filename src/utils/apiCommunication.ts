import { PROD_API_URL, DEV_API_URL } from '../config';

export type ApiHeader = {
    'Content-Type': string,
    authorization: string,
}

export const ERROR_DELIMITER: string = ' <<<<<<HUMAN|DETAILED>>>>> ';
export const GENERAL_ERROR_HEADING: string = 'Something went wrong...';
export const INTERNAL_SERVICE_ERROR_HEADING: string = 'There seems to be an Internal Service Error.';

export const getAPIURL = (): string => {
    if (process.env.NODE_ENV.toLocaleLowerCase() === 'production') {
        return PROD_API_URL;
    }

    return DEV_API_URL;
};

export const getHeaders = (jwt: string | null): ApiHeader => ({
    'Content-Type': 'application/json',
    authorization: `Bearer ${jwt}`
});

export const getAndValidateResponseData = async (response: Response, errorMessage: string = GENERAL_ERROR_HEADING): Promise<any> => {
    const { ok, status, url } = response;
    let data: any = {};

    if (response.headers.get('content-type') === 'application/json') {
        data = await response.json();
    }

    if (!ok) {
        const humanError: string = status === 500 ? INTERNAL_SERVICE_ERROR_HEADING : errorMessage;
        const computerError: string | undefined = data?.message;

        if (!computerError) {
            throw new Error(humanError);
        }

        throw new Error(`${humanError}${ERROR_DELIMITER}${computerError} (${url})`);
    }

    return { response, data };
};
