import { render } from '@testing-library/react';
import { type GetServerSidePropsContext } from 'next';
import React from 'react';

import { getServerSidePropsOrRedirect } from '../utils';
import ShoppingListPage, { getServerSideProps } from '../pages/shoppingList';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockImplementation(() => ({
        shoppingList: []
    }))
}));

jest.mock('../utils', () => ({
    getServerSidePropsOrRedirect: jest.fn()
}));

describe('Page - Shopping List', () => {
    it('should render', () => {
        const { container } = render(<ShoppingListPage />);

        expect(container).toBeInTheDocument();
    });

    it('should call getServerSidePropsOrRedirect with context', async () => {
        const context: Partial<GetServerSidePropsContext> = {
            req: {} as any,
            res: {} as any,
            params: {},
            query: {}
        } as GetServerSidePropsContext;

        jest.mocked(getServerSidePropsOrRedirect).mockResolvedValue({
            props: { user: { name: 'Troy' } } as any
        });

        const result = await getServerSideProps(context as GetServerSidePropsContext);

        expect(getServerSidePropsOrRedirect).toHaveBeenCalledWith(context);
        expect(result).toEqual({
            props: { user: { name: 'Troy' } }
        });
    });
});
