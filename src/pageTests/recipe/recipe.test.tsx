import { render, waitFor } from '@testing-library/react';
import { type GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getServerSidePropsWithoutAuthRedirect } from '../../utils';
import RecipePage, { getServerSideProps } from '../../pages/recipe/[recipe]';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: {
            recipe: 'test-recipe'
        }
    })
}));

jest.mock('../../utils', () => ({
    getServerSidePropsWithoutAuthRedirect: jest.fn()
}));

describe('Page - [Recipe]', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({}),
            ok: true,
            status: 200,
            headers: new Headers()
        } as Response));
    });

    it('should render', async () => {
        const { container } = render(<RecipePage />);

        await waitFor(() => {
            expect(container).toBeInTheDocument();
        });
    });

    it('should render without any recipe query', async () => {
        jest.mocked(useRouter).mockReturnValue({
            query: {}
        } as any);

        const { container } = render(<RecipePage />);

        await waitFor(() => {
            expect(container).toBeInTheDocument();
        });
    });

    it('should call getServerSidePropsWithoutAuthRedirect with context', async () => {
        const context: Partial<GetServerSidePropsContext> = {
            req: {} as any,
            res: {} as any,
            params: {},
            query: {}
        } as GetServerSidePropsContext;

        jest.mocked(getServerSidePropsWithoutAuthRedirect).mockResolvedValue({
            props: { user: { name: 'Troy' } } as any
        });

        const result = await getServerSideProps(context as GetServerSidePropsContext);

        expect(getServerSidePropsWithoutAuthRedirect).toHaveBeenCalledWith(context);
        expect(result).toEqual({
            props: { user: { name: 'Troy' } }
        });
    });
});
