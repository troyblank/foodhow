import Chance from 'chance';
import { mockShoppingList, mockUser } from '../../testing';
import { getAndValidateResponseData } from '../../utils/apiCommunication';
import { deleteShoppingListItems, getShoppingList } from './shoppingList';

jest.mock('../../utils/apiCommunication');

describe('Balance', () => {
    const chance = new Chance();

    it('Should be able to get a balance.', async () => {
        const shoppingList = mockShoppingList();

        jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: { shoppingList } });

        expect(await getShoppingList(mockUser())).toEqual(shoppingList);
    });

    it('Should be able to delete shopping list items.', async () => {
        const itemIds = [chance.integer(), chance.integer(), chance.integer()];

        jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: {} });

        await expect(deleteShoppingListItems(mockUser(), itemIds)).resolves.toBeUndefined();
    });
});
