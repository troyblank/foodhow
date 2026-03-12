import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type NewShoppingListItem, type User } from '../../types'
import { createShoppingListItem } from '..'
import { getClientJwt } from '../../utils/amplifyClient'
import { GET_SHOPPING_LIST_QUERY_KEY } from './getShoppingList'

export const useCreateShoppingListItem = (user: User) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (newShoppingListItem: NewShoppingListItem) => {
			const jwtToken = (await getClientJwt()) ?? user?.jwtToken ?? null
			if (!jwtToken) throw new Error('Not authenticated')
			return createShoppingListItem(jwtToken, newShoppingListItem)
		},
		onSuccess: () => {
			// Because we need an new id for the new item, we need to invalidate the whole query.
			queryClient.invalidateQueries({ queryKey: [GET_SHOPPING_LIST_QUERY_KEY] })
		},
	})
}
