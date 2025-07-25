import Chance from 'chance';
import { mockUser } from '../testing/mocks';
import { User } from '../types';
import { getUserFromAmplify, SIGN_IN_PATH } from '.';
import { getServerSidePropsOrRedirect } from './pages';

jest.mock('./');

describe('Pages Utils', () => {
    const chance = new Chance();

    it('should be able to get server side props', async () => {
        const setHeader = jest.fn();
        const expectedUser: User = mockUser();

        jest.mocked(getUserFromAmplify).mockResolvedValue(expectedUser);

        expect(await getServerSidePropsOrRedirect({ res: {
            setHeader,
            end: jest.fn()
        } } as any)).toStrictEqual({
            props: { user: expectedUser }
        });
        expect(setHeader).not.toHaveBeenCalled();
    });

    it('should not get get server side props if getting the session fails', async () => {
        const setHeader = jest.fn();

        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.mocked(getUserFromAmplify).mockRejectedValue(new Error(chance.paragraph()));

        expect(await getServerSidePropsOrRedirect({ res: {
            setHeader,
            end: jest.fn()
        } } as any)).toStrictEqual({
            props: { user: null }
        });
        expect(setHeader).toHaveBeenCalledWith('location', SIGN_IN_PATH);
    });
});
