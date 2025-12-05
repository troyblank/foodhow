import { useQueryClient, useMutation } from '@tanstack/react-query';
import Chance from 'chance';
import { mockShoppingList, mockUser } from '../../testing';
import { deleteShoppingListItems } from '../calls';
import { useDeleteShoppingListItems } from './deleteShoppingListItems';
import { GET_SHOPPING_LIST_QUERY_KEY } from './getShoppingList';

jest.mock('../calls');
jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQueryClient: jest.fn(),
    useMutation: jest.fn()
}));

describe('useDeleteShoppingListItems', () => {
    const chance = new Chance();

    beforeEach(() => {
        jest.mocked(useQueryClient).mockReturnValue({ setQueryData: jest.fn() } as any);
        jest.mocked(useMutation).mockImplementation((options: any) => ({
            mutate: jest.fn((itemIds) => {
                options.mutationFn(itemIds).then(() => {
                    options.onSuccess(undefined, itemIds);
                });
            })
        }) as any);
    });

    it('Should call deleteShoppingListItems with user and itemIds.', async () => {
        const user = mockUser();
        const itemIds = [chance.integer(), chance.integer(), chance.integer()];

        jest.mocked(deleteShoppingListItems).mockResolvedValue(undefined);

        useDeleteShoppingListItems(user);

        const mutationOptions = jest.mocked(useMutation).mock.calls[0][0] as any;
        await mutationOptions.mutationFn(itemIds);

        expect(deleteShoppingListItems).toHaveBeenCalledWith(user, itemIds);
    });

    it('Should update cache with remaining items on success.', () => {
        const user = mockUser();
        const shoppingList = mockShoppingList();
        const itemIdsToDelete = [shoppingList[0].id, shoppingList[1].id];

        const setQueryData = jest.fn();
        jest.mocked(useQueryClient).mockReturnValue({ setQueryData } as any);

        useDeleteShoppingListItems(user);

        const mutationOptions = jest.mocked(useMutation).mock.calls[0][0] as any;
        mutationOptions.onSuccess(undefined, itemIdsToDelete);

        expect(setQueryData).toHaveBeenCalledWith(
            [GET_SHOPPING_LIST_QUERY_KEY],
            expect.any(Function)
        );

        const filterFn = setQueryData.mock.calls[0][1];
        const result = filterFn(shoppingList);
        const expectedRemainingItems = shoppingList.filter(
            (item) => !itemIdsToDelete.includes(item.id)
        );

        expect(result).toEqual(expectedRemainingItems);
    });

    it('Should handle undefined cache data on success.', () => {
        const user = mockUser();
        const itemIdsToDelete = [chance.integer()];

        const setQueryData = jest.fn();
        jest.mocked(useQueryClient).mockReturnValue({ setQueryData } as any);

        useDeleteShoppingListItems(user);

        const mutationOptions = jest.mocked(useMutation).mock.calls[0][0] as any;
        mutationOptions.onSuccess(undefined, itemIdsToDelete);

        const filterFn = setQueryData.mock.calls[0][1];
        const result = filterFn(undefined);

        expect(result).toBeUndefined();
    });
});
