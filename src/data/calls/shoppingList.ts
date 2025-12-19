
import { type NewShoppingListItem, type ShoppingList, type User } from '../../types';
import { getAPIURL, getAndValidateResponseData, getHeaders } from '../../utils/apiCommunication';

export const getShoppingList = async (user: User): Promise<ShoppingList> => {
    const { jwtToken } = user;
    const { data } = await getAndValidateResponseData(await fetch(`${getAPIURL()}/getShoppingList`, {
        method: 'GET',
        headers: getHeaders(jwtToken)
    }));

    return data.shoppingList;
};

export const createShoppingListItem = async (user: User, newShoppingListItem: NewShoppingListItem): Promise<void> => {
    const { jwtToken } = user;
    await getAndValidateResponseData(await fetch(`${getAPIURL()}/createShoppingListItem`, {
        method: 'POST',
        headers: getHeaders(jwtToken),
        body: JSON.stringify(newShoppingListItem)
    }));
};

export const deleteShoppingListItems = async (user: User, itemIds: number[]): Promise<void> => {
    const { jwtToken } = user;
    await getAndValidateResponseData(await fetch(`${getAPIURL()}/deleteShoppingListItems`, {
        method: 'DELETE',
        headers: getHeaders(jwtToken),
        body: JSON.stringify(itemIds)
    }));
};
