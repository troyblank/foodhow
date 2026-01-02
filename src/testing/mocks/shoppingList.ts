import Chance from 'chance';
import {
	SHOPPING_ITEM_STORE,
	SHOPPING_ITEM_TYPE,
	type ShoppingList,
	type ShoppingListItem
} from '../../types';

const chance = new Chance();

export const mockShoppingListItem = (overrides: Partial<ShoppingListItem> = {}): ShoppingListItem => ({
	id: chance.natural(),
	amount: chance.natural(),
	name: chance.word(),
	type: chance.pickone(SHOPPING_ITEM_TYPE),
	store: chance.pickone(SHOPPING_ITEM_STORE),
	...overrides
});

export const mockShoppingList = (amount?: number): ShoppingList => {
	const amountOfItems = amount ?? chance.natural({ max: 50 });

	return Array.from(Array(amountOfItems)).map(() => mockShoppingListItem());
};
