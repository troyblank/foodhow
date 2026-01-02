import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chance from 'chance';
import { mockAuthContext, mockShoppingListItem, TestWrapper } from '../../testing';
import { useAuth } from '../../contexts';
import { useCreateShoppingListItem, useShoppingList } from '../../data';
import { extractLink, Ingredient } from './ingredient';

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

describe('Ingredient', () => {
	const chance = new Chance();
	const ingredientName = chance.word();
	const recipeName = chance.word();
	const url = `/${chance.word()}/${chance.word()}`;
	const link = `[${ingredientName}](${url})`;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('Should render.', () => {
		const { getByText } = render(<Ingredient ingredientName={ingredientName} recipeName={recipeName} />, { wrapper: TestWrapper });

		expect(getByText(ingredientName)).toBeInTheDocument();
	});

	it('Should render a link.', () => {
		const { getByText } = render(<Ingredient ingredientName={link} recipeName={recipeName} />, { wrapper: TestWrapper });
		const linkInDom = getByText(ingredientName);

		expect(linkInDom).toHaveAttribute('href', url);
	});

	it('Should be able to determine if an ingredient is in the shopping list.', async () => {
		const shoppingListItem = mockShoppingListItem({
			name: ingredientName,
			recipe: recipeName
		});

		jest.mocked(useShoppingList).mockReturnValue({
			data: [shoppingListItem],
			isLoading: false
		} as any);
		jest.mocked(useAuth).mockReturnValue(mockAuthContext());

		const { getByTestId } = render(<Ingredient ingredientName={ingredientName} recipeName={recipeName} />, { wrapper: TestWrapper });

		await waitFor(() => expect(getByTestId('ingredient').className).toContain('ingredient--active'));
	});

	it('Should not be able to toggle an ingredient if the user is not signed in.', async () => {
		jest.mocked(useAuth).mockReturnValue({
			user: null,
			attemptToSignIn: jest.fn()
		});
		jest.mocked(useShoppingList).mockReturnValue({
			data: [],
			isLoading: false
		} as any);

		const { getByText } = render(<Ingredient ingredientName={ingredientName} recipeName={recipeName} />, { wrapper: TestWrapper });

		expect(getByText(ingredientName).tagName).toBe('SPAN');
	});

	it('Should be able to toggle an ingredient if the user is signed in.', async () => {
		const mutateAsync = jest.fn().mockResolvedValue(undefined);

		jest.mocked(useShoppingList).mockReturnValue({
			data: [],
			isLoading: false
		} as any);
		jest.mocked(useCreateShoppingListItem).mockReturnValue({
			mutateAsync,
			isPending: false
		} as any);
		jest.mocked(useAuth).mockReturnValue(mockAuthContext());

		const { getByText } = render(<Ingredient ingredientName={ingredientName} recipeName={recipeName} />, { wrapper: TestWrapper });

		await userEvent.click(getByText(ingredientName));

		expect(mutateAsync).toHaveBeenCalledWith({
			amount: 1,
			name: ingredientName,
			recipe: recipeName,
			type: 'frozen',
			store: 'Unspecified'
		});
	});

	it('Should be able to extract a link from raw text that is in the proper format.', () => {
		const { full, label, url: extractedURL } = extractLink(link);

		expect(full).toBe(link);
		expect(label).toBe(ingredientName);
		expect(extractedURL).toBe(url);
	});

	it('Should not be able to extract a link from raw text that is not in the proper format.', () => {
		const badLink = extractLink(ingredientName);

		expect(badLink).toBeNull();
	});
});
