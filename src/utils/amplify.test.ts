import Chance from 'chance';
import {
    fetchAuthSession,
    fetchUserAttributes,
    getCurrentUser
} from 'aws-amplify/auth/server';
import { type User } from '../types';
import { mockUser } from '../testing';
import { extractUserInformationFromAmplifyServerContext, getUserFromAmplify } from './amplify';

jest.mock('@aws-amplify/adapter-nextjs', () => ({
    ...jest.requireActual('@aws-amplify/adapter-nextjs'),
    createServerRunner: jest.fn().mockReturnValue({
        runWithAmplifyServerContext: jest.fn()
    })
}));
jest.mock('aws-amplify/auth/server');

describe('Amplify Utils', () => {
    const chance = new Chance();

    it('should be able to get a user from a server context', async () => {
        expect(await getUserFromAmplify({ request: global.Request, response: global.Response } as any)).toBeNull();
    });

    it('should be able to extract user information from the amplify server context', async () => {
        const firstName: string = chance.first();
        const lastName: string = chance.last();
        const jwtToken: string = chance.guid();
        const username: string = chance.first();
        const expectedUser: User = mockUser({
            fullName: `${firstName} ${lastName}`,
            jwtToken,
            username
        });

        jest.mocked(getCurrentUser).mockResolvedValue({ username } as any);
        jest.mocked(fetchAuthSession).mockResolvedValue({ tokens: { idToken: jwtToken } } as any);
        jest.mocked(fetchUserAttributes).mockResolvedValue({ given_name: firstName, family_name: lastName } as any);

        expect(await extractUserInformationFromAmplifyServerContext({} as any)).toStrictEqual(expectedUser);
    });

    it('should return null if there is no user information in the amplify server context', async () => {
        jest.mocked(getCurrentUser).mockRejectedValue(new Error('User not found'));

        expect(await extractUserInformationFromAmplifyServerContext({} as any)).toBeNull();
    });
});
