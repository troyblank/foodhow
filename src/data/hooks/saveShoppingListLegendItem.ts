import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type NewShoppingListLegendItem, type ShoppingListLegend, type ShoppingListLegendItem, type User } from '../../types'
import { saveShoppingListLegendItem } from '..'
import { getClientJwt } from '../../utils/amplifyClient'
import { GET_SHOPPING_LIST_LEGEND_QUERY_KEY } from './getShoppingListLegend'

export const useSaveShoppingListLegendItem = (user: User) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (newLegendItem: NewShoppingListLegendItem) => {
			const jwtToken = (await getClientJwt()) ?? user?.jwtToken ?? null
			if (!jwtToken) throw new Error('Not authenticated')
			return saveShoppingListLegendItem(jwtToken, newLegendItem)
		},
		onSuccess: (savedLegendItem: ShoppingListLegendItem) => {
			// The server hands back the saved item with its id, so the legend on screen can be updated without a refetch.
			queryClient.setQueryData<ShoppingListLegend>(
				[GET_SHOPPING_LIST_LEGEND_QUERY_KEY],
				(oldLegend = []) => [...oldLegend, savedLegendItem],
			)
		},
	})
}
