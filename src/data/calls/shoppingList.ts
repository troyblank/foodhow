
import {
	type NewShoppingListItem,
	type NewShoppingListLegendItem,
	type ShoppingList,
	type ShoppingListLegend,
	type ShoppingListLegendItem,
} from '../../types'
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

export const getShoppingListLegend = async (jwtToken: string): Promise<ShoppingListLegend> => {
	const { data } = await getAndValidateResponseData(await fetch(`${getAPIURL()}/getShoppingListLegend`, {
		method: 'GET',
		headers: getHeaders(jwtToken),
	}))

	return data.legend
}

export const saveShoppingListLegendItem = async (jwtToken: string, newLegendItem: NewShoppingListLegendItem): Promise<ShoppingListLegendItem> => {
	const { data } = await getAndValidateResponseData(await fetch(`${getAPIURL()}/saveShoppingListLegendItem`, {
		method: 'POST',
		headers: getHeaders(jwtToken),
		body: JSON.stringify(newLegendItem),
	}))

	return data.legendItem
}

export const deleteShoppingListLegendItem = async (jwtToken: string, itemId: number): Promise<void> => {
	await getAndValidateResponseData(await fetch(`${getAPIURL()}/deleteShoppingListLegendItem`, {
		method: 'DELETE',
		headers: getHeaders(jwtToken),
		body: JSON.stringify(itemId),
	}))
}
