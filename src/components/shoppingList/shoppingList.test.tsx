
import { fireEvent, render } from '@testing-library/react'
import Chance from 'chance';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingList } from './shoppingList';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockImplementation(() => ({
        shoppingList: []
    }))
}));

describe('Shopping List', () => {
    const chance = new Chance();

    it('Should render.', () => {
        const checkedIngredientName = chance.word();
        const uncheckedIngredientName = chance.word();
        jest.mocked( useSelector ).mockImplementation((selector) => selector({
            shoppingList: {
                noResultsMessage: { headline: chance.word(), body: chance.word() },
                shoppingList: [{
                    checked: true,
                    id: chance.natural(),
                    text: checkedIngredientName
                },
                {
                    checked: false,
                    id: chance.natural(),
                    text: uncheckedIngredientName
                }]
            }
        }));

        const { getByText } = render(<ShoppingList />);

        expect(getByText(checkedIngredientName)).toBeInTheDocument();
        expect(getByText(uncheckedIngredientName)).toBeInTheDocument();
    });

    it('Should render a no ingredients message.', () => {
        const noResultsMessage = { headline: chance.word(), body: chance.word() };

        const checkedIngredientName = chance.word();
        const uncheckedIngredientName = chance.word();
        jest.mocked( useSelector ).mockImplementation((selector) => selector({
            shoppingList: {
                noResultsMessage,
            }
        }));

        const { getByText } = render(<ShoppingList />);
        const { headline, body } = noResultsMessage;

        expect(getByText(headline)).toBeInTheDocument();
        expect(getByText(body)).toBeInTheDocument();
    });

    it('Should handle toggling an ingredient', () => {
        const dispatch = jest.fn();
        const ingredientName = chance.word({ syllables: 5 });

        jest.mocked( useDispatch ).mockReturnValue(dispatch);

        jest.mocked( useSelector ).mockImplementation((selector) => selector({
            shoppingList: {
                noResultsMessage: { headline: chance.word(), body: chance.word() },
                shoppingList: [
                    { text: ingredientName, checked: false, id: chance.word() },
                    { text: chance.word(), checked: true, id: chance.word() },
                    { text: chance.word(), checked: false, id: chance.word() }
                ]
            }
        }));

        const { getByText } = render(<ShoppingList />);

        fireEvent.click(getByText(ingredientName));

        expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should handle clearing checked ingredients', () => {
        const dispatch = jest.fn()

        jest.mocked( useDispatch ).mockReturnValue(dispatch);

        jest.mocked( useSelector ).mockImplementation((selector) => selector({
            shoppingList: {
                noResultsMessage: { headline: chance.word(), body: chance.word() },
                shoppingList: [
                    { text: chance.word(), id: chance.word() },
                    { text: chance.word(), checked: true, id: chance.word() },
                    { text: chance.word(), checked: false, id: chance.word() }
                ]
            }
        }));

        const { getByText } = render(<ShoppingList />);

        fireEvent.click(getByText('Clear checked'));

        expect(dispatch).toHaveBeenCalledTimes(1);
    });
});
