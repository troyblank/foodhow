import { render } from '@testing-library/react'
import React from 'react';

import ShoppingListPage from './shoppingList';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockImplementation(() => ({
        shoppingList: []
    }))
}));

describe('Page - Shopping List', () => {
    it('should render', () => {
        const { container } = render(<ShoppingListPage />);

        expect(container).toBeInTheDocument();
    });
});
