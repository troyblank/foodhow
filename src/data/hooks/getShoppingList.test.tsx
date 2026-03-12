import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { TestWrapper, mockShoppingList, mockUser } from '../../testing'
import { getShoppingList } from '../calls'
import { useShoppingList } from './getShoppingList'
import { getClientJwt } from '../../utils/amplifyClient'

jest.mock('../calls')
jest.mock('../../utils/amplifyClient')

describe('useShoppingList', () => {
	it('Fetches and returns the shopping list.', async () => {
		const user = mockUser()
		const shoppingList = mockShoppingList()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(getShoppingList).mockResolvedValue(shoppingList)

		const { result } = renderHook(() => useShoppingList(user), {
			wrapper: TestWrapper,
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(result.current.data).toEqual(shoppingList)
		expect(getShoppingList).toHaveBeenCalledWith(user.jwtToken)
	})

	it('Shows loading while the list is being fetched.', () => {
		const user = mockUser()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(getShoppingList).mockImplementation(() => new Promise(() => {}))

		const { result } = renderHook(() => useShoppingList(user), {
			wrapper: TestWrapper,
		})

		expect(result.current.isLoading).toBe(true)
		expect(result.current.data).toBeUndefined()
	})

	it('Surfaces an error when the fetch fails.', async () => {
		const user = mockUser()
		const error = new Error('Failed to fetch shopping list')

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(getShoppingList).mockRejectedValue(error)

		const queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		})

		const ErrorTestWrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		)

		const { result } = renderHook(() => useShoppingList(user), {
			wrapper: ErrorTestWrapper,
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(error)
		expect(result.current.data).toBeUndefined()
	})

	it('Uses the session token from the page when a fresh token is not available.', async () => {
		const user = mockUser()
		const shoppingList = mockShoppingList()

		jest.mocked(getClientJwt).mockResolvedValue(null)
		jest.mocked(getShoppingList).mockResolvedValue(shoppingList)

		const { result } = renderHook(() => useShoppingList(user), {
			wrapper: TestWrapper,
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(getShoppingList).toHaveBeenCalledWith(user.jwtToken)
		expect(result.current.data).toEqual(shoppingList)
	})

	it('Shows not authenticated when both the session and page token are missing.', async () => {
		jest.mocked(getClientJwt).mockResolvedValue(null)

		const queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		})
		const wrapper = ({ children }: React.PropsWithChildren) => (
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		)

		const { result } = renderHook(() => useShoppingList(null as any), {
			wrapper,
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(new Error('Not authenticated'))
		expect(getShoppingList).not.toHaveBeenCalled()
	})
})
