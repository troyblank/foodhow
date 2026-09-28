import Chance from 'chance'
import { mockShoppingList, mockShoppingListLegend, mockShoppingListLegendItem, mockUser } from '../../testing'
import { getAndValidateResponseData } from '../../utils/apiCommunication'
import {
	createShoppingListItem,
	deleteShoppingListItems,
	deleteShoppingListLegendItem,
	getShoppingList,
	getShoppingListLegend,
	saveShoppingListLegendItem,
} from './shoppingList'
import { SHOPPING_ITEM_STORE, SHOPPING_ITEM_TYPE, type NewShoppingListItem } from '../../types'

jest.mock('../../utils/apiCommunication')

describe('Balance', () => {
	const chance = new Chance()

	it('Fetches the shopping list from the server.', async () => {
		const shoppingList = mockShoppingList()
		const user = mockUser()

		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: { shoppingList } })

		expect(await getShoppingList(user.jwtToken)).toEqual(shoppingList)
	})

	it('Creates a new item on the shopping list.', async () => {
		const newItem: NewShoppingListItem = {
			amount: chance.natural(),
			name: chance.word(),
			type: chance.pickone(Object.values(SHOPPING_ITEM_TYPE)),
			store: chance.pickone(Object.values(SHOPPING_ITEM_STORE)),
		}

		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: {} })

		await expect(createShoppingListItem(mockUser().jwtToken, newItem)).resolves.toBeUndefined()
	})

	it('Deletes the given items from the shopping list.', async () => {
		const itemIds = [chance.integer(), chance.integer(), chance.integer()]

		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: {} })

		await expect(deleteShoppingListItems(mockUser().jwtToken, itemIds)).resolves.toBeUndefined()
	})

	it('Fetches the shopping list legend from the server.', async () => {
		const legend = mockShoppingListLegend()

		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: { legend } })

		expect(await getShoppingListLegend(mockUser().jwtToken)).toEqual(legend)
	})

	it('Saves a new legend item and returns the saved item from the server.', async () => {
		const savedLegendItem = mockShoppingListLegendItem()
		const { emoji, name } = savedLegendItem

		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: { legendItem: savedLegendItem } })

		expect(await saveShoppingListLegendItem(mockUser().jwtToken, { emoji, name })).toEqual(savedLegendItem)
	})

	it('Deletes the given legend item.', async () => {
		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: {} })

		await expect(deleteShoppingListLegendItem(mockUser().jwtToken, chance.natural())).resolves.toBeUndefined()
	})
})
