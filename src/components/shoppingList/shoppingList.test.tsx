
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import React from 'react';
import { TestWrapper, mockShoppingListItem, mockUser } from '../../testing';
import { ShoppingList } from './shoppingList';
import * as shoppingListModule from './shoppingList';
import { useShoppingList } from '../../data';
import { useAuth } from '../../contexts';

jest.mock('../../data', () => ({
    useShoppingList: jest.fn()
}));

jest.mock('../../contexts', () => ({
    useAuth: jest.fn()
}));

describe('Shopping List', () => {
    const chance = new Chance();

    beforeEach(() => {
        localStorage.clear();
    });

    it('Should render.', async () => {
        const checkedItemName = chance.word();
        const uncheckedItemName = chance.word();
        const checkedItem = mockShoppingListItem({ name: checkedItemName, id: chance.natural() });
        const uncheckedItem = mockShoppingListItem({ name: uncheckedItemName, id: chance.natural() });
        const shoppingList = [checkedItem, uncheckedItem];

        jest.mocked(useAuth).mockReturnValue({
            user: mockUser(),
            attemptToSignIn: jest.fn()
        });

        jest.mocked(useShoppingList).mockReturnValue({
            isLoading: false,
            isError: false,
            data: shoppingList,
            error: null
        } as any);

        const { getByText } = render(<ShoppingList />, { wrapper: TestWrapper });

        await waitFor(() => {
            expect(getByText(checkedItemName)).toBeInTheDocument();
            expect(getByText(uncheckedItemName)).toBeInTheDocument();
        });
    });


    it('Should load checked items from localStorage.', async () => {
        const checkedItemName = chance.word();
        const uncheckedItemName = chance.word();
        const checkedItemId = chance.natural();
        const uncheckedItemId = chance.natural();
        const shoppingList = [
            mockShoppingListItem({ name: checkedItemName, id: checkedItemId }),
            mockShoppingListItem({ name: uncheckedItemName, id: uncheckedItemId })
        ];

        localStorage.setItem('shoppingListCheckedShoppingListItems', JSON.stringify([checkedItemId]));

        jest.mocked(useAuth).mockReturnValue({
            user: mockUser(),
            attemptToSignIn: jest.fn()
        });

        jest.mocked(useShoppingList).mockReturnValue({
            isLoading: false,
            isError: false,
            data: shoppingList,
            error: null
        } as any);

        const { getByRole } = render(<ShoppingList />, { wrapper: TestWrapper });

        await waitFor(() => {
            const checkedCheckbox = getByRole('checkbox', { name: `Mark ${checkedItemName} as unchecked` });
            expect(checkedCheckbox).toBeChecked();

            const uncheckedCheckbox = getByRole('checkbox', { name: `Mark ${uncheckedItemName} as checked` });
            expect(uncheckedCheckbox).not.toBeChecked();
        });
    });

    it('Should render a no items message.', async () => {
        jest.mocked(useAuth).mockReturnValue({
            user: mockUser(),
            attemptToSignIn: jest.fn()
        });

        jest.mocked(useShoppingList).mockReturnValue({
            isLoading: false,
            isError: false,
            data: [],
            error: null
        } as any);

        const { getByText } = render(<ShoppingList />, { wrapper: TestWrapper });

        await waitFor(() => {
            expect(getByText('figure out title')).toBeInTheDocument();
            expect(getByText('no things or oh so proud')).toBeInTheDocument();
        });
    });

    it('Should handle toggling an item.', async () => {
        const user = userEvent.setup();
        const itemName = chance.word({ syllables: 5 });
        const itemId = chance.natural();
        const shoppingList = [
            mockShoppingListItem({ name: itemName, id: itemId }),
            mockShoppingListItem({ name: chance.word(), id: chance.natural() }),
            mockShoppingListItem({ name: chance.word(), id: chance.natural() })
        ];

        jest.mocked(useAuth).mockReturnValue({
            user: mockUser(),
            attemptToSignIn: jest.fn()
        });

        jest.mocked(useShoppingList).mockReturnValue({
            isLoading: false,
            isError: false,
            data: shoppingList,
            error: null
        } as any);

        const { getByText, getByRole } = render(<ShoppingList />, { wrapper: TestWrapper });

        await waitFor(() => {
            expect(getByText(itemName)).toBeInTheDocument();
        });

        const checkbox = getByRole('checkbox', { name: `Mark ${itemName} as checked` });

        expect(checkbox).not.toBeChecked();

        await user.click(getByText(itemName));

        await waitFor(() => {
            const checkedCheckbox = getByRole('checkbox', { name: `Mark ${itemName} as unchecked` });
            expect(checkedCheckbox).toBeChecked();
        });

        await user.click(getByText(itemName));

        await waitFor(() => {
            const uncheckedCheckbox = getByRole('checkbox', { name: `Mark ${itemName} as checked` });
            expect(uncheckedCheckbox).not.toBeChecked();
        });
    });

    it('Should handle deleting checked items.', async () => {
        const user = userEvent.setup();
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        const checkedItemId = chance.natural();
        const uncheckedItemId = chance.natural();
        const shoppingList = [
            mockShoppingListItem({ name: chance.word(), id: chance.natural() }),
            mockShoppingListItem({ name: chance.word(), id: checkedItemId }),
            mockShoppingListItem({ name: chance.word(), id: uncheckedItemId })
        ];

        jest.mocked(useAuth).mockReturnValue({
            user: mockUser(),
            attemptToSignIn: jest.fn()
        });

        jest.mocked(useShoppingList).mockReturnValue({
            isLoading: false,
            isError: false,
            data: shoppingList,
            error: null
        } as any);

        const { getByText, queryByText, findByText } = render(<ShoppingList />, { wrapper: TestWrapper });
        const checkedItemName = shoppingList.find((item) => item.id === checkedItemId)!.name;

        await waitFor(() => {
            expect(getByText(checkedItemName)).toBeInTheDocument();
        });

        expect(queryByText('Delete Checked')).not.toBeInTheDocument();

        await user.click(getByText(checkedItemName));

        const deleteButton = await findByText('Delete Checked');

        expect(deleteButton).toBeInTheDocument();

        await user.click(deleteButton);

        expect(consoleSpy).toHaveBeenCalledWith('Clear items not implemented yet!');
        consoleSpy.mockRestore();
    });

    it('Should throw error when localStorage.setItem fails.', async () => {
        const itemName = chance.word();
        const itemId = chance.natural();
        const shoppingList = [
            mockShoppingListItem({ name: itemName, id: itemId })
        ];

        jest.mocked(useAuth).mockReturnValue({
            user: mockUser(),
            attemptToSignIn: jest.fn()
        });

        jest.mocked(useShoppingList).mockReturnValue({
            isLoading: false,
            isError: false,
            data: shoppingList,
            error: null
        } as any);

        const throwErrorSpy = jest.spyOn(shoppingListModule, 'throwLocalStorageError').mockImplementation((() => {}) as () => never);
        const { getByText, getByRole } = render(<ShoppingList />, { wrapper: TestWrapper });

        await waitFor(() => {
            expect(getByText(itemName)).toBeInTheDocument();
        });

        // Wait for initial localStorage load to complete by waiting for checkbox to be rendered
        await waitFor(() => {
            expect(getByRole('checkbox', { name: `Mark ${itemName} as checked` })).toBeInTheDocument();
        });

        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('Storage quota exceeded');
        });

        const user = userEvent.setup();

        await user.click(getByText(itemName));

        expect(setItemSpy).toHaveBeenCalled();
        expect(throwErrorSpy).toHaveBeenCalled();

        setItemSpy.mockRestore();
        throwErrorSpy.mockRestore();
    });
});
