import { useQuery } from '@tanstack/react-query'
import { type ShoppingListLegend, type User } from '../../types'
import { getShoppingListLegend } from '..'
import { getClientJwt } from '../../utils/amplifyClient'

export const GET_SHOPPING_LIST_LEGEND_QUERY_KEY = 'getShoppingListLegend'

// Ids are creation timestamps, so this keeps the legend in the order items were added.
const sortLegendById = (legend: ShoppingListLegend): ShoppingListLegend => (
	[...legend].sort((itemA, itemB) => itemA.id - itemB.id)
)

export const useShoppingListLegend = (user: User) => useQuery({
	queryKey: [GET_SHOPPING_LIST_LEGEND_QUERY_KEY],
	queryFn: async () => {
		const jwtToken = (await getClientJwt()) ?? user?.jwtToken ?? null
		if (!jwtToken) throw new Error('Not authenticated')
		return getShoppingListLegend(jwtToken)
	},
	select: sortLegendById,
})
