import { mockShoppingList, mockUser } from '../../testing';
import { getAndValidateResponseData } from '../../utils/apiCommunication';
import { getShoppingList } from './shoppingList';

jest.mock('../../utils/apiCommunication');

describe('Balance', () => {
    it('Should be able to get a balance.', async () => {
        const shoppingList = mockShoppingList();

        jest.mocked(getAndValidateResponseData).mockResolvedValue({ data: { shoppingList } });

        expect(await getShoppingList(mockUser())).toEqual(shoppingList);
    });
});
