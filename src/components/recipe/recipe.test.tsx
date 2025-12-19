import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Chance from 'chance';
import { Recipe } from '.';

jest.mock('../../contexts', () => ({
    useAuth: jest.fn().mockImplementation(() => ({
        user: null
    }))
}));

jest.mock('../../data', () => ({
    useShoppingList: jest.fn().mockImplementation(() => ({
        data: [],
        isLoading: false
    })),
    useCreateShoppingListItem: jest.fn().mockImplementation(() => ({
        mutateAsync: jest.fn(),
        isPending: false
    }))
}));

describe('Recipe', () => {
    const chance = new Chance();
    const title = chance.word({ syllables: 4 });
    const meta = chance.word({ syllables: 3 });
    const ingredients = [chance.word(), chance.word(), chance.word()];
    const directions = [
        { text: chance.word({ syllable: 3 }) },
        { text: chance.word({ syllable: 4 }) },
        { text: chance.word({ syllable: 5 }) }
    ];
    const recipe = {
        title,
        meta,
        ingredients,
        directions
    };

    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(recipe),
            ok: true,
            status: 200,
            headers: new Headers()
        } as Response));
    });

    it('Should render.', async () => {
        const { getByText } = render(<Recipe fileName={chance.word()} />);

        await waitFor(() => {
            expect(getByText(title)).toBeInTheDocument();
        });
    });

    it('Should render all ingredients and directions.', async () => {
        const { getByText } = render(<Recipe fileName={chance.word()} />);

        await waitFor(() => {
            expect(getByText(ingredients[0])).toBeInTheDocument();
            expect(getByText(ingredients[1])).toBeInTheDocument();
            expect(getByText(ingredients[2])).toBeInTheDocument();
            expect(getByText(directions[0].text)).toBeInTheDocument();
            expect(getByText(directions[1].text)).toBeInTheDocument();
            expect(getByText(directions[2].text)).toBeInTheDocument();
        });
    });

    it('Should render a recipe that has nested ingredients.', async () => {
        const nestedIngredientA = chance.word({ syllable: 2 });
        const nestedIngredientB = chance.word({ syllable: 3 });
        const nestedIngredientC = chance.word({ syllable: 4 });
        const nestedIngredientD = chance.word({ syllable: 5 });

        const multiStepIngredients = {
            [chance.word()]: [nestedIngredientA, nestedIngredientB],
            [chance.word()]: [nestedIngredientC, nestedIngredientD]
        };

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                ...recipe,
                ingredients: multiStepIngredients
            }),
            ok: true,
            status: 200,
            headers: new Headers()
        } as Response));

        const { getByText } = render(<Recipe fileName={chance.word()} />);

        await waitFor(() => {
            expect(getByText(nestedIngredientA)).toBeInTheDocument();
            expect(getByText(nestedIngredientB)).toBeInTheDocument();
            expect(getByText(nestedIngredientC)).toBeInTheDocument();
            expect(getByText(nestedIngredientD)).toBeInTheDocument();
        });
    });
});
