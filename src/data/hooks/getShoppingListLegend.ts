import { useQuery } from '@tanstack/react-query'
import { type User } from '../../types'
import { getShoppingListLegend } from '..'
import { getClientJwt } from '../../utils/amplifyClient'

export const GET_SHOPPING_LIST_LEGEND_QUERY_KEY = 'getShoppingListLegend'

export const useShoppingListLegend = (user: User) => useQuery({
	queryKey: [GET_SHOPPING_LIST_LEGEND_QUERY_KEY],
	queryFn: async () => {
		const jwtToken = (await getClientJwt()) ?? user?.jwtToken ?? null
		if (!jwtToken) throw new Error('Not authenticated')
		return getShoppingListLegend(jwtToken)
	},
})
