import Chance from 'chance';
import reducer, { initialState } from './reducer';
import { TOGGLE_INGREDIENT_ON_LIST } from '../ingredient/actions';
import { TOGGLE_INGREDIENT_CHECK_MARK, CLEAR_CHECKED_INGREDIENTS } from './actions';

describe('Shopping List Reducer', () => {
    const chance = new Chance();
    const { noResultsMessage } = initialState;

    it('Should return initial state.', () => {
        expect(reducer(undefined, {})).toEqual( {shoppingList: [], noResultsMessage })
    });

    it('Should handle toggling ingredients.', () => {
        const ingredient1 = { id: chance.word() };
        const ingredient2 = { id: chance.word() };
        const ingredient3 = { id: ingredient2.id };

        let state = reducer(initialState, {
            type: TOGGLE_INGREDIENT_ON_LIST,
            ingredient: ingredient1
        });
        state = reducer(state, {
            type: TOGGLE_INGREDIENT_ON_LIST,
            ingredient: ingredient2
        });

        const reduction = reducer(state, {
            type: TOGGLE_INGREDIENT_ON_LIST,
            ingredient: ingredient3
        });

        const expectedReduction = {
            shoppingList: [ingredient1],
            noResultsMessage
        };

        expect(reduction).toEqual(expectedReduction);
    });

    it('Should handle toggling an ingredient check mark.', () => {
        const id = chance.word();
        const shoppingList = [{ id }, { id: chance.word() }, { id: chance.word() }];
        const expectedReturnState = { shoppingList: [{ id, checked: true }, { id: shoppingList[1].id }, { id: shoppingList[2].id }] };

        expect(reducer({ shoppingList } as any, { type: TOGGLE_INGREDIENT_CHECK_MARK, ingredientID: id })).toEqual(expectedReturnState);
    });

    it('Should handle clearing all ingredients.', () => {
        const unCheckedList = [{ id: chance.word() }, { id: chance.word() }];
        const checkedList = [{ id: chance.word(), checked: true }, { id: chance.word(), checked: true }, { id: chance.word(), checked: true }];
        const shoppingList = [...unCheckedList, ...checkedList];
        const expectedReturnState = {
            shoppingList: unCheckedList,
            noResultsMessage: {
                headline: 'Done!',
                body: 'Oh, so proud of you!'
            }
        };

        expect(reducer({ shoppingList } as any, { type: CLEAR_CHECKED_INGREDIENTS })).toEqual(expectedReturnState);
    });
});
