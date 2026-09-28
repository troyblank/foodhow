import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { mockShoppingListLegend, mockShoppingListLegendItem, mockUser } from '../../testing'
import { saveShoppingListLegendItem } from '../calls'
import { useSaveShoppingListLegendItem } from './saveShoppingListLegendItem'
import { GET_SHOPPING_LIST_LEGEND_QUERY_KEY } from './getShoppingListLegend'
import { getClientJwt } from '../../utils/amplifyClient'
import { type NewShoppingListLegendItem, type ShoppingListLegend } from '../../types'

jest.mock('../calls')
jest.mock('../../utils/amplifyClient')

const wrapperFor = (queryClient: QueryClient) => ({ children }: React.PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>
)

const newLegendItemFrom = ({ emoji, name }: NewShoppingListLegendItem): NewShoppingListLegendItem => ({ emoji, name })

describe('useSaveShoppingListLegendItem', () => {
	it('Saves a new legend item.', async () => {
		const user = mockUser()
		const savedLegendItem = mockShoppingListLegendItem()
		const newLegendItem = newLegendItemFrom(savedLegendItem)

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(saveShoppingListLegendItem).mockResolvedValue(savedLegendItem)

		const { result } = renderHook(() => useSaveShoppingListLegendItem(user), { wrapper: wrapperFor(new QueryClient()) })

		await act(async () => {
			result.current.mutate(newLegendItem)
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(saveShoppingListLegendItem).toHaveBeenCalledWith(user.jwtToken, newLegendItem)
	})

	it('Adds the saved item to the legend shown on screen.', async () => {
		const user = mockUser()
		const existingLegend = mockShoppingListLegend(2)
		const savedLegendItem = mockShoppingListLegendItem()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(saveShoppingListLegendItem).mockResolvedValue(savedLegendItem)

		const queryClient = new QueryClient()
		queryClient.setQueryData<ShoppingListLegend>([GET_SHOPPING_LIST_LEGEND_QUERY_KEY], existingLegend)

		const { result } = renderHook(() => useSaveShoppingListLegendItem(user), { wrapper: wrapperFor(queryClient) })

		await act(async () => {
			result.current.mutate(newLegendItemFrom(savedLegendItem))
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(queryClient.getQueryData([GET_SHOPPING_LIST_LEGEND_QUERY_KEY])).toEqual([...existingLegend, savedLegendItem])
	})

	it('Starts a new legend on screen when none has been loaded yet.', async () => {
		const user = mockUser()
		const savedLegendItem = mockShoppingListLegendItem()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(saveShoppingListLegendItem).mockResolvedValue(savedLegendItem)

		const queryClient = new QueryClient()

		const { result } = renderHook(() => useSaveShoppingListLegendItem(user), { wrapper: wrapperFor(queryClient) })

		await act(async () => {
			result.current.mutate(newLegendItemFrom(savedLegendItem))
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(queryClient.getQueryData([GET_SHOPPING_LIST_LEGEND_QUERY_KEY])).toEqual([savedLegendItem])
	})

	it('Surfaces an error when the save request fails.', async () => {
		const user = mockUser()
		const error = new Error('Failed to save legend item')

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(saveShoppingListLegendItem).mockRejectedValue(error)

		const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } })

		const { result } = renderHook(() => useSaveShoppingListLegendItem(user), { wrapper: wrapperFor(queryClient) })

		await act(async () => {
			result.current.mutate(newLegendItemFrom(mockShoppingListLegendItem()))
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(error)
	})

	it('Uses the session token from the page when a fresh token is not available.', async () => {
		const user = mockUser()
		const savedLegendItem = mockShoppingListLegendItem()
		const newLegendItem = newLegendItemFrom(savedLegendItem)

		jest.mocked(getClientJwt).mockResolvedValue(null)
		jest.mocked(saveShoppingListLegendItem).mockResolvedValue(savedLegendItem)

		const { result } = renderHook(() => useSaveShoppingListLegendItem(user), { wrapper: wrapperFor(new QueryClient()) })

		await act(async () => {
			result.current.mutate(newLegendItem)
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(saveShoppingListLegendItem).toHaveBeenCalledWith(user.jwtToken, newLegendItem)
	})

	it('Shows not authenticated when both the session and page token are missing.', async () => {
		jest.mocked(getClientJwt).mockResolvedValue(null)

		const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } })

		const { result } = renderHook(() => useSaveShoppingListLegendItem(null as any), { wrapper: wrapperFor(queryClient) })

		await act(async () => {
			result.current.mutate(newLegendItemFrom(mockShoppingListLegendItem()))
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(new Error('Not authenticated'))
		expect(saveShoppingListLegendItem).not.toHaveBeenCalled()
	})
})
