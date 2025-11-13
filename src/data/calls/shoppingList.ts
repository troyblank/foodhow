
import { type ShoppingList, type User } from '../../types';
import { getAPIURL, getAndValidateResponseData, getHeaders } from '../../utils/apiCommunication';

export const getShoppingList = async (user: User): Promise<ShoppingList> => {
    const { jwtToken } = user;
    const { data } = await getAndValidateResponseData(await fetch(`${getAPIURL()}/getShoppingList`, {
        method: 'GET',
        headers: getHeaders(jwtToken)
    }));

    return data.shoppingList;
};
