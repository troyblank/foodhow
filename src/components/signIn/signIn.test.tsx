
import React from 'react';
import Chance from 'chance';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { mockAuthContext } from '../../testing';
import { useAuth } from '../../contexts';
import { SignIn } from './signIn';
import { HOME_PATH } from '../../utils';

jest.mock('../../contexts');

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn().mockImplementation(() => ({ push: jest.fn() }))
}));

describe('Sign In', () => {
    const chance = new Chance();

    beforeEach(() => {
        jest.mocked(useAuth).mockReturnValue(mockAuthContext({
            attemptToSignIn: jest.fn()
        }));
    });

    it('Should render.', () => {
        const { getByText } = render(<SignIn />);

        expect(getByText('Username:')).toBeInTheDocument();
        expect(getByText('Password:')).toBeInTheDocument();
    });

    it('Should show sign in error message if there is one.', async () => {
        const errorMessage: string = chance.sentence();

        jest.mocked(useAuth).mockReturnValue(mockAuthContext({
            attemptToSignIn: jest.fn().mockRejectedValue(new Error(errorMessage))
        }));

        const { getByText } = render(<SignIn />);

        await waitFor(async () => {
            await fireEvent.click(getByText('Login'));
        });

        expect(getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    it('Should be able to change username and password.', async () => {
        const newUserName = chance.name();
        const newPassword = chance.word();

        const { getByLabelText } = render(<SignIn />);

        const userNameInput = getByLabelText('Username:') as HTMLInputElement;
        const passwordInput = getByLabelText('Password:') as HTMLInputElement;

        await waitFor(async () => {
            await fireEvent.change(userNameInput, { target: { value: newUserName } });
            await fireEvent.change(passwordInput, { target: { value: newPassword } });
        });

        expect(userNameInput.value).toBe(newUserName);
        expect(passwordInput.value).toBe(newPassword);
    });

    it('Should be able to sign in a user and redirect them to the home page.', async () => {
        const push = jest.fn();
        const attemptToSignIn = jest.fn().mockResolvedValue({ isUserComplete: true });

        jest.mocked(useRouter).mockReturnValue({ push } as any);
        jest.mocked(useAuth).mockReturnValue(mockAuthContext({
            attemptToSignIn
        }));

        const { getByLabelText } = render(<SignIn />);

        const submitInput = getByLabelText('submit');

        await waitFor(async () => {
            await fireEvent.submit(submitInput);
        });

        expect(attemptToSignIn).toHaveBeenCalledTimes(1);
        expect(push).toHaveBeenCalledWith(HOME_PATH);
    });

    it('Should not be able to sign in a user if a the user is invalid.', async () => {
        const attemptToSignIn = jest.fn().mockResolvedValue({ isUserComplete: false });

        jest.mocked(useAuth).mockReturnValue(mockAuthContext({
            attemptToSignIn
        }));

        const { getByLabelText, getByText } = render(<SignIn />);

        const submitInput = getByLabelText('submit');

        await waitFor(async () => {
            await fireEvent.submit(submitInput);
            await fireEvent.submit(submitInput);
        });

        expect(getByText('User is invalid.')).toBeInTheDocument();
    });
});
