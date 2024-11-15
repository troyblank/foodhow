import { render, waitFor } from '@testing-library/react'
import Chance from 'chance';
import { useRouter } from 'next/router';
import React from 'react';
import RecipePage from './[recipe]';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: {
            recipe: 'test-recipe'
        }
    })
}));

describe('Page - [Recipe]', () => {
    const chance = new Chance();

        beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
                ok: true,
                status: 200,
                headers: new Headers(),
            } as Response)
        );
    });

    it('should render', async() => {
        const { container } = render(<RecipePage />);

        await waitFor(() => {
            expect(container).toBeInTheDocument();
        })
    })

    it('should render without any recipe query', async() => {
        jest.mocked(useRouter).mockReturnValue({
            query: {}
        } as any);

        const { container } = render(<RecipePage />);

        await waitFor(() => {
            expect(container).toBeInTheDocument();
        })
    })
});
