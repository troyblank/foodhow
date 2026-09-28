import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ShoppingListLegend, type User } from '../../types'
import { deleteShoppingListLegendItem } from '..'
import { getClientJwt } from '../../utils/amplifyClient'
import { GET_SHOPPING_LIST_LEGEND_QUERY_KEY } from './getShoppingListLegend'

export const useDeleteShoppingListLegendItem = (user: User) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (itemId: number) => {
			const jwtToken = (await getClientJwt()) ?? user?.jwtToken ?? null
			if (!jwtToken) throw new Error('Not authenticated')
			return deleteShoppingListLegendItem(jwtToken, itemId)
		},
		onSuccess: (_data, itemId) => {
			// Optimistically update the legend with the remaining items.
			queryClient.setQueryData<ShoppingListLegend>(
				[GET_SHOPPING_LIST_LEGEND_QUERY_KEY],
				(oldLegend) => oldLegend?.filter(({ id }) => id !== itemId),
			)
		},
	})
}
