import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ShoppingList, type User } from '../../types'
import { deleteShoppingListItems } from '..'
import { getClientJwt } from '../../utils/amplifyClient'
import { GET_SHOPPING_LIST_QUERY_KEY } from './getShoppingList'

export const DELETE_SHOPPINNG_LIST_ITEMS_KEY = 'deleteShoppingListItems'

export const useDeleteShoppingListItems = (user: User) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (itemIds: number[]) => {
			const jwtToken = (await getClientJwt()) ?? user?.jwtToken ?? null
			if (!jwtToken) throw new Error('Not authenticated')
			return deleteShoppingListItems(jwtToken, itemIds)
		},
		onSuccess: (_data, itemIds) => {
			// Optimistically update the shopping list with remainder of items.
			queryClient.setQueryData<ShoppingList>(
				[GET_SHOPPING_LIST_QUERY_KEY],
				(oldItems) => oldItems?.filter(({ id }) => !itemIds.includes(id)),
			)
		},
	})
}
