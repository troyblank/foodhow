import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Chance from 'chance'
import { mockShoppingListLegend, mockUser } from '../../testing'
import { deleteShoppingListLegendItem } from '../calls'
import { useDeleteShoppingListLegendItem } from './deleteShoppingListLegendItem'
import { GET_SHOPPING_LIST_LEGEND_QUERY_KEY } from './getShoppingListLegend'
import { getClientJwt } from '../../utils/amplifyClient'
import { type ShoppingListLegend } from '../../types'

jest.mock('../calls')
jest.mock('../../utils/amplifyClient')

const wrapperFor = (queryClient: QueryClient) => ({ children }: React.PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>
)

describe('useDeleteShoppingListLegendItem', () => {
	const chance = new Chance()

	it('Deletes the given legend item.', async () => {
		const user = mockUser()
		const itemId = chance.natural()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(deleteShoppingListLegendItem).mockResolvedValue(undefined)

		const { result } = renderHook(() => useDeleteShoppingListLegendItem(user), { wrapper: wrapperFor(new QueryClient()) })

		await act(async () => {
			result.current.mutate(itemId)
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(deleteShoppingListLegendItem).toHaveBeenCalledWith(user.jwtToken, itemId)
	})

	it('Removes the deleted item from the legend shown on screen.', async () => {
		const user = mockUser()
		const legend = mockShoppingListLegend(3)
		const [itemToDelete, ...remainingItems] = legend

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(deleteShoppingListLegendItem).mockResolvedValue(undefined)

		const queryClient = new QueryClient()
		queryClient.setQueryData<ShoppingListLegend>([GET_SHOPPING_LIST_LEGEND_QUERY_KEY], legend)

		const { result } = renderHook(() => useDeleteShoppingListLegendItem(user), { wrapper: wrapperFor(queryClient) })

		await act(async () => {
			result.current.mutate(itemToDelete.id)
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(queryClient.getQueryData([GET_SHOPPING_LIST_LEGEND_QUERY_KEY])).toEqual(remainingItems)
	})

	it('Handles a delete when the legend on screen has not been loaded yet.', async () => {
		const user = mockUser()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(deleteShoppingListLegendItem).mockResolvedValue(undefined)

		const queryClient = new QueryClient()

		const { result } = renderHook(() => useDeleteShoppingListLegendItem(user), { wrapper: wrapperFor(queryClient) })

		await act(async () => {
			result.current.mutate(chance.natural())
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(queryClient.getQueryData([GET_SHOPPING_LIST_LEGEND_QUERY_KEY])).toBeUndefined()
	})

	it('Surfaces an error when the delete request fails.', async () => {
		const user = mockUser()
		const error = new Error('Failed to delete legend item')

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(deleteShoppingListLegendItem).mockRejectedValue(error)

		const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } })

		const { result } = renderHook(() => useDeleteShoppingListLegendItem(user), { wrapper: wrapperFor(queryClient) })

		await act(async () => {
			result.current.mutate(chance.natural())
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(error)
	})

	it('Uses the session token from the page when a fresh token is not available.', async () => {
		const user = mockUser()
		const itemId = chance.natural()

		jest.mocked(getClientJwt).mockResolvedValue(null)
		jest.mocked(deleteShoppingListLegendItem).mockResolvedValue(undefined)

		const { result } = renderHook(() => useDeleteShoppingListLegendItem(user), { wrapper: wrapperFor(new QueryClient()) })

		await act(async () => {
			result.current.mutate(itemId)
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(deleteShoppingListLegendItem).toHaveBeenCalledWith(user.jwtToken, itemId)
	})

	it('Shows not authenticated when both the session and page token are missing.', async () => {
		jest.mocked(getClientJwt).mockResolvedValue(null)

		const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } })

		const { result } = renderHook(() => useDeleteShoppingListLegendItem(null as any), { wrapper: wrapperFor(queryClient) })

		await act(async () => {
			result.current.mutate(chance.natural())
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(new Error('Not authenticated'))
		expect(deleteShoppingListLegendItem).not.toHaveBeenCalled()
	})
})
