import { useQuery } from '@tanstack/react-query'
import { type User } from '../../types'
import { getShoppingList } from '..'
import { getClientJwt } from '../../utils/amplifyClient'

export const GET_SHOPPING_LIST_QUERY_KEY = 'getShoppingList'

export const useShoppingList = (user: User) => useQuery({
	queryKey: [GET_SHOPPING_LIST_QUERY_KEY],
	queryFn: async () => {
		const jwtToken = (await getClientJwt()) ?? user?.jwtToken ?? null
		if (!jwtToken) throw new Error('Not authenticated')
		return getShoppingList(jwtToken)
	},
})
