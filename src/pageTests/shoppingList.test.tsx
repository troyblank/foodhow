import { render } from '@testing-library/react';
import { type GetServerSidePropsContext } from 'next';
import React from 'react';

import { getServerSidePropsWithUnauthRedirect } from '../utils';
import ShoppingListPage, { getServerSideProps } from '../pages/shoppingList';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockImplementation(() => ({
        shoppingList: []
    }))
}));

jest.mock('../utils', () => ({
    getServerSidePropsWithUnauthRedirect: jest.fn()
}));

describe('Page - Shopping List', () => {
    it('should render', () => {
        const { container } = render(<ShoppingListPage />);

        expect(container).toBeInTheDocument();
    });

    it('should call getServerSidePropsWithUnauthRedirect with context', async () => {
        const context: Partial<GetServerSidePropsContext> = {
            req: {} as any,
            res: {} as any,
            params: {},
            query: {}
        } as GetServerSidePropsContext;

        jest.mocked(getServerSidePropsWithUnauthRedirect).mockResolvedValue({
            props: { user: { name: 'Troy' } } as any
        });

        const result = await getServerSideProps(context as GetServerSidePropsContext);

        expect(getServerSidePropsWithUnauthRedirect).toHaveBeenCalledWith(context);
        expect(result).toEqual({
            props: { user: { name: 'Troy' } }
        });
    });
});
