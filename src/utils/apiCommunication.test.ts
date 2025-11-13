import Chance from 'chance';
import { PROD_API_URL, DEV_API_URL } from '../config';
import {
    getAPIURL,
    getHeaders,
    getAndValidateResponseData,
    ERROR_DELIMITER,
    GENERAL_ERROR_HEADING,
    INTERNAL_SERVICE_ERROR_HEADING
} from './apiCommunication';

describe('API Communication Util', () => {
    const chance = new Chance();
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
        if (originalEnv === undefined) {
            Object.defineProperty(process.env, 'NODE_ENV', {
                value: undefined,
                writable: true,
                configurable: true
            });
        } else {
            Object.defineProperty(process.env, 'NODE_ENV', {
                value: originalEnv,
                writable: true,
                configurable: true
            });
        }
    });

    it('Should return the production API URL when in production environment.', () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
            value: 'production',
            writable: true,
            configurable: true
        });

        expect(getAPIURL()).toBe(PROD_API_URL);
    });

    it('Should return the production API URL when in production environment (case insensitive).', () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
            value: 'PRODUCTION',
            writable: true,
            configurable: true
        });

        expect(getAPIURL()).toBe(PROD_API_URL);
    });

    it('Should return the development API URL when in development environment.', () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
            value: 'development',
            writable: true,
            configurable: true
        });

        expect(getAPIURL()).toBe(DEV_API_URL);
    });

    it('Should return the development API URL when in test environment.', () => {
        Object.defineProperty(process.env, 'NODE_ENV', {
            value: 'test',
            writable: true,
            configurable: true
        });

        expect(getAPIURL()).toBe(DEV_API_URL);
    });

    it('Should be able to get jwt injected api headers.', () => {
        const jwt: string = chance.string();

        expect(getHeaders(jwt)).toEqual({
            'Content-Type': 'application/json',
            authorization: `Bearer ${jwt}`
        });
    });

    it('Should be able to validate a good response by not throwing an error.', async () => {
        const value: string = chance.word();
        const response = {
            ok: true,
            statusText: 'Such a good call.',
            headers: { get: (name: string) => (name === 'content-type' ? 'application/json' : '') },
            json: async () => Promise.resolve(value)
        };

        expect(await getAndValidateResponseData(response as Response)).toEqual({ data: value, response });
    });

    it('Should not get any data if the response is not JSON.', async () => {
        const value: string = chance.word();
        const response = {
            ok: true,
            statusText: 'Such a good call.',
            headers: { get: (name: string) => (name === 'content-type' ? 'text/html' : '') },
            json: async () => Promise.resolve(value)
        };

        expect(await getAndValidateResponseData(response as Response)).toEqual({ data: {}, response });
    });

    it('Should use custom error message when provided.', async () => {
        const customError: string = chance.sentence();
        const errorMessage: string = chance.word();
        const response = {
            ok: false,
            statusText: chance.sentence(),
            status: 400,
            url: chance.url(),
            headers: { get: (name: string) => (name === 'content-type' ? 'application/json' : '') },
            json: async () => Promise.resolve({ message: errorMessage })
        };

        await expect(getAndValidateResponseData(response as Response, customError)).rejects.toThrow(`${customError}${ERROR_DELIMITER}${errorMessage} (${response.url})`);
    });

    it('Should throw an error for a 500 error.', async () => {
        const errorMessage: string = chance.word();
        const url: string = chance.url();
        const status: number = 500;
        const response = {
            ok: false,
            statusText: chance.sentence(),
            status,
            url,
            headers: { get: (name: string) => (name === 'content-type' ? 'application/json' : '') },
            json: async () => Promise.resolve({ message: errorMessage })
        };

        await expect(getAndValidateResponseData(response as Response)).rejects.toThrow(`${INTERNAL_SERVICE_ERROR_HEADING}${ERROR_DELIMITER}${errorMessage} (${url})`);
    });

    it('Should throw a human error for a 500 error when there is no message in the response.', async () => {
        const response = {
            ok: false,
            statusText: chance.sentence(),
            status: 500,
            url: chance.url(),
            headers: { get: (name: string) => (name === 'content-type' ? 'application/json' : '') },
            json: async () => Promise.resolve({})
        };

        await expect(getAndValidateResponseData(response as Response)).rejects.toThrow(INTERNAL_SERVICE_ERROR_HEADING);
    });

    it('Should throw a human error for a 500 error when the response data is null.', async () => {
        const response = {
            ok: false,
            statusText: chance.sentence(),
            status: 500,
            url: chance.url(),
            headers: { get: (name: string) => (name === 'content-type' ? 'application/json' : '') },
            json: async () => Promise.resolve(null)
        };

        await expect(getAndValidateResponseData(response as Response)).rejects.toThrow(INTERNAL_SERVICE_ERROR_HEADING);
    });

    it('Should throw a human error if there is no message in the response.', async () => {
        const url: string = chance.url();
        const response = {
            ok: false,
            statusText: chance.sentence(),
            status: 501,
            url,
            headers: { get: (name: string) => (name === 'content-type' ? 'application/json' : '') },
            json: async () => Promise.resolve({})
        };
        await expect(getAndValidateResponseData(response as Response)).rejects.toThrow(`${GENERAL_ERROR_HEADING}`);
    });

    it('Should throw an error for a bad response.', async () => {
        const response = {
            ok: false,
            statusText: 'Such a bad call.',
            status: 403,
            headers: { get: (name: string) => (name === 'content-type' ? 'application/json' : '') },
            json: async () => Promise.resolve({})
        };

        await expect(getAndValidateResponseData(response as Response)).rejects.toThrow(GENERAL_ERROR_HEADING);
    });
});
