import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Chance from 'chance';
import { mockShoppingItemType } from '../../testing';
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
	const ingredients = [
		{ text: chance.word(), type: mockShoppingItemType() },
		{ text: chance.word(), type: mockShoppingItemType() },
		{ text: chance.word(), type: mockShoppingItemType() }
	];
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
			expect(getByText(ingredients[0].text)).toBeInTheDocument();
			expect(getByText(ingredients[1].text)).toBeInTheDocument();
			expect(getByText(ingredients[2].text)).toBeInTheDocument();
			expect(getByText(directions[0].text)).toBeInTheDocument();
			expect(getByText(directions[1].text)).toBeInTheDocument();
			expect(getByText(directions[2].text)).toBeInTheDocument();
		});
	});

	it('Should render a recipe that has nested ingredients.', async () => {
		const nestedIngredientA = { text: chance.word({ syllables: 5 }), type: mockShoppingItemType() };
		const nestedIngredientB = { text: chance.word({ syllables: 5 }), type: mockShoppingItemType() };
		const nestedIngredientC = { text: chance.word({ syllables: 5 }), type: mockShoppingItemType() };
		const nestedIngredientD = { text: chance.word({ syllables: 5 }), type: mockShoppingItemType() };

		const multiStepIngredients = {
			[chance.word({ syllables: 4 })]: [nestedIngredientA, nestedIngredientB],
			[chance.word({ syllables: 4 })]: [nestedIngredientC, nestedIngredientD]
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
			expect(getByText(nestedIngredientA.text)).toBeInTheDocument();
			expect(getByText(nestedIngredientB.text)).toBeInTheDocument();
			expect(getByText(nestedIngredientC.text)).toBeInTheDocument();
			expect(getByText(nestedIngredientD.text)).toBeInTheDocument();
		});
	});
});
