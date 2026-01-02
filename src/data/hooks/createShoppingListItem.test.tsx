import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Chance from 'chance';
import { mockUser } from '../../testing';
import { createShoppingListItem } from '../calls';
import { useCreateShoppingListItem } from './createShoppingListItem';
import { GET_SHOPPING_LIST_QUERY_KEY } from './getShoppingList';
import { SHOPPING_ITEM_STORE, SHOPPING_ITEM_TYPE, type NewShoppingListItem } from '../../types';

jest.mock('../calls');

const chance = new Chance();

const mockNewShoppingListItem = (): NewShoppingListItem => ({
	amount: chance.natural(),
	name: chance.word(),
	type: chance.pickone(SHOPPING_ITEM_TYPE),
	store: chance.pickone(SHOPPING_ITEM_STORE)
});

describe('useCreateShoppingListItem', () => {
	it('Should create a shopping list item.', async () => {
		const user = mockUser();
		const newItem = mockNewShoppingListItem();

		jest.mocked(createShoppingListItem).mockResolvedValue();

		const queryClient = new QueryClient();
		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		);

		const { result } = renderHook(() => useCreateShoppingListItem(user), { wrapper });

		await act(async () => {
			result.current.mutate(newItem);
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(createShoppingListItem).toHaveBeenCalledWith(user, newItem);
	});

	it('Should invalidate shopping list query on success.', async () => {
		const user = mockUser();
		const newItem = mockNewShoppingListItem();

		jest.mocked(createShoppingListItem).mockResolvedValue();

		const queryClient = new QueryClient();
		const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		);

		const { result } = renderHook(() => useCreateShoppingListItem(user), { wrapper });

		await act(async () => {
			result.current.mutate(newItem);
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: [GET_SHOPPING_LIST_QUERY_KEY] });
	});

	it('Should handle error state.', async () => {
		const user = mockUser();
		const newItem = mockNewShoppingListItem();
		const error = new Error('Failed to create shopping list item');

		jest.mocked(createShoppingListItem).mockRejectedValue(error);

		const queryClient = new QueryClient({
			defaultOptions: {
				mutations: {
					retry: false
				}
			}
		});

		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		);

		const { result } = renderHook(() => useCreateShoppingListItem(user), { wrapper });

		await act(async () => {
			result.current.mutate(newItem);
		});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toEqual(error);
	});
});
