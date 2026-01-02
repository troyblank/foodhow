import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { TestWrapper, mockShoppingList, mockUser } from '../../testing';
import { getShoppingList } from '../calls';
import { useShoppingList } from './getShoppingList';

jest.mock('../calls');

describe('useShoppingList', () => {
	it('Should fetch and return shopping list data.', async () => {
		const user = mockUser();
		const shoppingList = mockShoppingList();

		jest.mocked(getShoppingList).mockResolvedValue(shoppingList);

		const { result } = renderHook(() => useShoppingList(user), {
			wrapper: TestWrapper
		});

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(result.current.data).toEqual(shoppingList);
		expect(getShoppingList).toHaveBeenCalledWith(user);
	});

	it('Should handle loading state.', () => {
		const user = mockUser();

		jest.mocked(getShoppingList).mockImplementation(() => new Promise(() => {}));

		const { result } = renderHook(() => useShoppingList(user), {
			wrapper: TestWrapper
		});

		expect(result.current.isLoading).toBe(true);
		expect(result.current.data).toBeUndefined();
	});

	it('Should handle error state.', async () => {
		const user = mockUser();
		const error = new Error('Failed to fetch shopping list');

		jest.mocked(getShoppingList).mockRejectedValue(error);

		const queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false
				}
			}
		});

		const ErrorTestWrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		);

		const { result } = renderHook(() => useShoppingList(user), {
			wrapper: ErrorTestWrapper
		});

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.error).toEqual(error);
		expect(result.current.data).toBeUndefined();
	});
});
