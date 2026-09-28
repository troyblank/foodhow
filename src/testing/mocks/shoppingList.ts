import Chance from 'chance'
import {
	SHOPPING_ITEM_STORE,
	SHOPPING_ITEM_TYPE,
	type ShoppingItemType,
	type ShoppingList,
	type ShoppingListItem,
	type ShoppingListLegend,
	type ShoppingListLegendItem,
} from '../../types'

const chance = new Chance()

export const LEGEND_EMOJI = ['🍎', '🥦', '🥩', '🧂', '🧊', '🐑', '💀'] as const

export const mockShoppingItemType = (): ShoppingItemType => chance.pickone(Object.values(SHOPPING_ITEM_TYPE))

export const mockShoppingListItem = (overrides: Partial<ShoppingListItem> = {}): ShoppingListItem => ({
	id: chance.natural(),
	amount: chance.natural(),
	name: chance.word(),
	type: chance.pickone(Object.values(SHOPPING_ITEM_TYPE)),
	store: chance.pickone(Object.values(SHOPPING_ITEM_STORE)),
	...overrides,
})

export const mockShoppingList = (amount?: number): ShoppingList => {
	const amountOfItems = amount ?? chance.natural({ max: 50 })

	return Array.from(Array(amountOfItems)).map(() => mockShoppingListItem())
}

export const mockShoppingListLegendItem = (overrides: Partial<ShoppingListLegendItem> = {}): ShoppingListLegendItem => ({
	id: chance.natural(),
	emoji: chance.pickone([...LEGEND_EMOJI]),
	name: chance.word(),
	user: chance.first(),
	...overrides,
})

export const mockShoppingListLegend = (amount?: number): ShoppingListLegend => {
	const amountOfItems = amount ?? chance.natural({ min: 1, max: 10 })
	const uniqueIds = chance.unique(chance.natural, amountOfItems)

	return uniqueIds.map((id) => mockShoppingListLegendItem({ id }))
}
