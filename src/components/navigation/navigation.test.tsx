import React from 'react';
import { render } from '@testing-library/react';
import Chance from 'chance';
import { mockUser } from '../../testing';
import { useAuth } from '../../contexts';
import { Navigation } from '.';

jest.mock('../../contexts', () => ({
    useAuth: jest.fn()
}));

describe('Navigation', () => {
    const chance = new Chance();

    it('should render', () => {
        jest.mocked(useAuth).mockReturnValue({ user: mockUser() } as any);

        const { getByText } = render(<Navigation />);

        expect(getByText('home')).toBeInTheDocument();
        expect(getByText('guide')).toBeInTheDocument();
        expect(getByText('list')).toBeInTheDocument();
    });

    it('should render a sign in link if the user is not authenticated', () => {
        jest.mocked(useAuth).mockReturnValue({ user: null } as any);

        const { getByText, queryByText } = render(<Navigation />);

        expect(queryByText('list')).not.toBeInTheDocument();
        expect(getByText('Sign In')).toBeInTheDocument();
    });
});
