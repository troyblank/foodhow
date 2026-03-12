import { useQueryClient, useMutation } from '@tanstack/react-query'
import Chance from 'chance'
import { mockShoppingList, mockUser } from '../../testing'
import { deleteShoppingListItems } from '../calls'
import { useDeleteShoppingListItems } from './deleteShoppingListItems'
import { GET_SHOPPING_LIST_QUERY_KEY } from './getShoppingList'
import { getClientJwt } from '../../utils/amplifyClient'

jest.mock('../calls')
jest.mock('../../utils/amplifyClient')
jest.mock('@tanstack/react-query', () => ({
	...jest.requireActual('@tanstack/react-query'),
	useQueryClient: jest.fn(),
	useMutation: jest.fn(),
}))

describe('useDeleteShoppingListItems', () => {
	const chance = new Chance()

	beforeEach(() => {
		jest.mocked(useQueryClient).mockReturnValue({ setQueryData: jest.fn() } as any)
		jest.mocked(useMutation).mockImplementation((options: any) => ({
			mutate: jest.fn((itemIds) => {
				options.mutationFn(itemIds).then(() => {
					options.onSuccess(undefined, itemIds)
				})
			}),
		}) as any)
	})

	it('Deletes the given items from the list.', async () => {
		const user = mockUser()
		const itemIds = [chance.integer(), chance.integer(), chance.integer()]

		jest.mocked(getClientJwt).mockResolvedValue(user.jwtToken)
		jest.mocked(deleteShoppingListItems).mockResolvedValue(undefined)

		useDeleteShoppingListItems(user)

		const mutationOptions = jest.mocked(useMutation).mock.calls[0][0] as any
		await mutationOptions.mutationFn(itemIds)

		expect(deleteShoppingListItems).toHaveBeenCalledWith(user.jwtToken, itemIds)
	})

	it('Removes deleted items from the list shown on screen.', () => {
		const user = mockUser()
		const shoppingList = mockShoppingList(3)
		const itemIdsToDelete = [shoppingList[0].id, shoppingList[1].id]

		const setQueryData = jest.fn()
		jest.mocked(useQueryClient).mockReturnValue({ setQueryData } as any)

		useDeleteShoppingListItems(user)

		const mutationOptions = jest.mocked(useMutation).mock.calls[0][0] as any
		mutationOptions.onSuccess(undefined, itemIdsToDelete)

		expect(setQueryData).toHaveBeenCalledWith(
			[GET_SHOPPING_LIST_QUERY_KEY],
			expect.any(Function),
		)

		const filterFn = setQueryData.mock.calls[0][1]
		const result = filterFn(shoppingList)
		const expectedRemainingItems = shoppingList.filter(
			(item) => !itemIdsToDelete.includes(item.id),
		)

		expect(result).toEqual(expectedRemainingItems)
	})

	it('Handles delete when the list on screen is empty or not yet loaded.', () => {
		const user = mockUser()
		const itemIdsToDelete = [chance.integer()]

		const setQueryData = jest.fn()
		jest.mocked(useQueryClient).mockReturnValue({ setQueryData } as any)

		useDeleteShoppingListItems(user)

		const mutationOptions = jest.mocked(useMutation).mock.calls[0][0] as any
		mutationOptions.onSuccess(undefined, itemIdsToDelete)

		const filterFn = setQueryData.mock.calls[0][1]
		const result = filterFn(undefined)

		expect(result).toBeUndefined()
	})

	it('Uses the session token from the page when a fresh token is not available.', async () => {
		const user = mockUser()
		const itemIds = [chance.integer(), chance.integer()]

		jest.mocked(getClientJwt).mockResolvedValue(null)
		jest.mocked(deleteShoppingListItems).mockResolvedValue(undefined)

		useDeleteShoppingListItems(user)

		const mutationOptions = jest.mocked(useMutation).mock.calls[0][0] as any
		await mutationOptions.mutationFn(itemIds)

		expect(deleteShoppingListItems).toHaveBeenCalledWith(user.jwtToken, itemIds)
	})

	it('Shows not authenticated when both the session and page token are missing.', async () => {
		const itemIds = [chance.integer()]

		jest.mocked(getClientJwt).mockResolvedValue(null)

		useDeleteShoppingListItems(null as any)

		const mutationOptions = jest.mocked(useMutation).mock.calls[0][0] as any

		await expect(mutationOptions.mutationFn(itemIds)).rejects.toThrow('Not authenticated')
		expect(deleteShoppingListItems).not.toHaveBeenCalled()
	})
})
