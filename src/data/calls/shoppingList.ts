
import { type NewShoppingListItem, type ShoppingList } from '../../types'
import { getAPIURL, getAndValidateResponseData, getHeaders } from '../../utils/apiCommunication'

export const getShoppingList = async (jwtToken: string): Promise<ShoppingList> => {
	const { data } = await getAndValidateResponseData(await fetch(`${getAPIURL()}/getShoppingList`, {
		method: 'GET',
		headers: getHeaders(jwtToken),
	}))

	return data.shoppingList
}

export const createShoppingListItem = async (jwtToken: string, newShoppingListItem: NewShoppingListItem): Promise<void> => {
	await getAndValidateResponseData(await fetch(`${getAPIURL()}/createShoppingListItem`, {
		method: 'POST',
		headers: getHeaders(jwtToken),
		body: JSON.stringify(newShoppingListItem),
	}))
}

export const deleteShoppingListItems = async (jwtToken: string, itemIds: number[]): Promise<void> => {
	await getAndValidateResponseData(await fetch(`${getAPIURL()}/deleteShoppingListItems`, {
		method: 'DELETE',
		headers: getHeaders(jwtToken),
		body: JSON.stringify(itemIds),
	}))
}
