import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type NewShoppingListItem, type User } from '../../types';
import { createShoppingListItem } from '..';
import { GET_SHOPPING_LIST_QUERY_KEY } from './getShoppingList';

export const DELETE_SHOPPINNG_LIST_ITEMS_KEY = 'deleteShoppingListItems';

export const useCreateShoppingListItem = (user: User) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newShoppingListItem: NewShoppingListItem) => createShoppingListItem(user, newShoppingListItem),
        onSuccess: () => {
            // Because we need an new id for the new item, we need to invalidate the whole query.
            queryClient.invalidateQueries({ queryKey: [GET_SHOPPING_LIST_QUERY_KEY] });
        }
    });
};
