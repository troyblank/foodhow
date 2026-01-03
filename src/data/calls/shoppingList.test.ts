import Chance from 'chance';
import { mockShoppingList, mockUser } from '../../testing';
import { getAndValidateResponseData } from '../../utils/apiCommunication';
import { createShoppingListItem, deleteShoppingListItems, getShoppingList } from './shoppingList';
import { SHOPPING_ITEM_STORE, SHOPPING_ITEM_TYPE, type NewShoppingListItem } from '../../types';

jest.mock('../../utils/apiCommunication');

describe('Balance', () => {
	const chance = new Chance();

	it('Should be able to get a balance.', async () => {
		const shoppingList = mockShoppingList();

		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: { shoppingList } });

		expect(await getShoppingList(mockUser())).toEqual(shoppingList);
	});

	it('Should be able to create a shopping list item.', async () => {
		const newItem: NewShoppingListItem = {
			amount: chance.natural(),
			name: chance.word(),
			type: chance.pickone(Object.values(SHOPPING_ITEM_TYPE)),
			store: chance.pickone(Object.values(SHOPPING_ITEM_STORE))
		};

		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: {} });

		await expect(createShoppingListItem(mockUser(), newItem)).resolves.toBeUndefined();
	});

	it('Should be able to delete shopping list items.', async () => {
		const itemIds = [chance.integer(), chance.integer(), chance.integer()];

		jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: {} });

		await expect(deleteShoppingListItems(mockUser(), itemIds)).resolves.toBeUndefined();
	});
});
