import { useQuery } from '@tanstack/react-query';
import { type User } from '../../types';
import { getShoppingList } from '..';

export const GET_SHOPPING_LIST_QUERY_KEY = 'getShoppingList';

export const useShoppingList = (user: User) => useQuery({
	queryKey: [GET_SHOPPING_LIST_QUERY_KEY],
	queryFn: () => getShoppingList(user)
});
