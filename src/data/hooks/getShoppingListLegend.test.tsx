import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { TestWrapper, mockShoppingListLegend, mockUser } from '../../testing'
import { getShoppingListLegend } from '../calls'
import { useShoppingListLegend } from './getShoppingListLegend'
import { getClientJwt } from '../../utils/amplifyClient'

jest.mock('../calls')
jest.mock('../../utils/amplifyClient')

const noRetryWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})

	return ({ children }: React.PropsWithChildren) => (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}

describe('useShoppingListLegend', () => {
	it('Fetches and returns the shopping list legend.', async () => {
		const user = mockUser()
		const legend = mockShoppingListLegend()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(getShoppingListLegend).mockResolvedValue(legend)

		const { result } = renderHook(() => useShoppingListLegend(user), {
			wrapper: TestWrapper,
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(result.current.data).toEqual(legend)
		expect(getShoppingListLegend).toHaveBeenCalledWith(user.jwtToken)
	})

	it('Shows loading while the legend is being fetched.', () => {
		const user = mockUser()

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(getShoppingListLegend).mockImplementation(() => new Promise(() => {}))

		const { result } = renderHook(() => useShoppingListLegend(user), {
			wrapper: TestWrapper,
		})

		expect(result.current.isLoading).toBe(true)
		expect(result.current.data).toBeUndefined()
	})

	it('Surfaces an error when the fetch fails.', async () => {
		const user = mockUser()
		const error = new Error('Failed to fetch shopping list legend')

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(getShoppingListLegend).mockRejectedValue(error)

		const { result } = renderHook(() => useShoppingListLegend(user), {
			wrapper: noRetryWrapper(),
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(error)
	})

	it('Uses the session token from the page when a fresh token is not available.', async () => {
		const user = mockUser()
		const legend = mockShoppingListLegend()

		jest.mocked(getClientJwt).mockResolvedValue(null)
		jest.mocked(getShoppingListLegend).mockResolvedValue(legend)

		const { result } = renderHook(() => useShoppingListLegend(user), {
			wrapper: TestWrapper,
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(getShoppingListLegend).toHaveBeenCalledWith(user.jwtToken)
	})

	it('Shows not authenticated when both the session and page token are missing.', async () => {
		jest.mocked(getClientJwt).mockResolvedValue(null)

		const { result } = renderHook(() => useShoppingListLegend(null as any), {
			wrapper: noRetryWrapper(),
		})

		await waitFor(() => {
			expect(result.current.isError).toBe(true)
		})

		expect(result.current.error).toEqual(new Error('Not authenticated'))
		expect(getShoppingListLegend).not.toHaveBeenCalled()
	})
})
