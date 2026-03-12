import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Chance from 'chance'
import { mockUser } from '../../testing'
import { createShoppingListItem } from '../calls'
import { useCreateShoppingListItem } from './createShoppingListItem'
import { GET_SHOPPING_LIST_QUERY_KEY } from './getShoppingList'
import { getClientJwt } from '../../utils/amplifyClient'
import { SHOPPING_ITEM_STORE, SHOPPING_ITEM_TYPE, type NewShoppingListItem } from '../../types'

jest.mock('../calls')
jest.mock('../../utils/amplifyClient')

const chance = new Chance()

const mockNewShoppingListItem = (): NewShoppingListItem => ({
	amount: chance.natural(),
	name: chance.word(),
	type: chance.pickone(Object.values(SHOPPING_ITEM_TYPE)),
	store: chance.pickone(Object.values(SHOPPING_ITEM_STORE)),
})

describe('useCreateShoppingListItem', () => {
	it('Creates a new item on the shopping list.', async () => {
		const user = mockUser()
		const newItem = mockNewShoppingListItem()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(createShoppingListItem).mockResolvedValue()

		const queryClient = new QueryClient()
		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		)

		const { result } = renderHook(() => useCreateShoppingListItem(user), { wrapper })

		await act(async () => {
			result.current.mutate(newItem)
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(createShoppingListItem).toHaveBeenCalledWith(user.jwtToken, newItem)
	})

	it('Refreshes the list on screen after a new item is added.', async () => {
		const user = mockUser()
		const newItem = mockNewShoppingListItem()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(createShoppingListItem).mockResolvedValue()

		const queryClient = new QueryClient()
		const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries')

		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		)

		const { result } = renderHook(() => useCreateShoppingListItem(user), { wrapper })

		await act(async () => {
			result.current.mutate(newItem)
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: [GET_SHOPPING_LIST_QUERY_KEY] })
	})

	it('Surfaces an error when the create request fails.', async () => {
		const user = mockUser()
		const newItem = mockNewShoppingListItem()
		const error = new Error('Failed to create shopping list item')

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(createShoppingListItem).mockRejectedValue(error)

		const queryClient = new QueryClient({
			defaultOptions: {
				mutations: {
					retry: false,
				},
			},
		})

		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		)

		const { result } = renderHook(() => useCreateShoppingListItem(user), { wrapper })

		await act(async () => {
			result.current.mutate(newItem)
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(error)
	})

	it('Uses the session token from the page when a fresh token is not available.', async () => {
		const user = mockUser()
		const newItem = mockNewShoppingListItem()

		jest.mocked(getClientJwt).mockResolvedValue(null)
		jest.mocked(createShoppingListItem).mockResolvedValue()

		const queryClient = new QueryClient()
		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		)

		const { result } = renderHook(() => useCreateShoppingListItem(user), { wrapper })

		await act(async () => {
			result.current.mutate(newItem)
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(createShoppingListItem).toHaveBeenCalledWith(user.jwtToken, newItem)
	})

	it('Shows not authenticated when both the session and page token are missing.', async () => {
		const newItem = mockNewShoppingListItem()

		jest.mocked(getClientJwt).mockResolvedValue(null)

		const queryClient = new QueryClient({
			defaultOptions: {
				mutations: {
					retry: false,
				},
			},
		})
		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		)

		const { result } = renderHook(() => useCreateShoppingListItem(null as any), { wrapper })

		await act(async () => {
			result.current.mutate(newItem)
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(new Error('Not authenticated'))
		expect(createShoppingListItem).not.toHaveBeenCalled()
	})
})
