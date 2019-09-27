import { assert } from 'chai';
import Chance from 'chance';
import reducer, { initialState } from './reducer';
import { TOGGLE_INGREDIENT_ON_LIST } from '../ingredient/actions';
import { TOGGLE_INGREDIENT_CHECK_MARK, CLEAR_CHECKED_INGREDIENTS } from './actions';

describe('Shopping List Reducer', () => {
    const chance = new Chance();

    it('should return initial state', () => {
        assert.deepEqual(reducer(undefined, {}), { shoppingList: [] });
    });

    it('should handle toggline ingredients', () => {
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
            shoppingList: [ingredient1]
        };

        assert.deepEqual(reduction, expectedReduction);
    });

    it('should handle toggling an ingredient check mark', () => {
        const id = chance.word();
        const shoppingList = [{ id }, { id: chance.word() }, { id: chance.word() }];
        const expectedReturnState = { shoppingList: [{ id, checked: true }, { id: shoppingList[1].id }, { id: shoppingList[2].id }] };

        assert.deepEqual(reducer({ shoppingList }, { type: TOGGLE_INGREDIENT_CHECK_MARK, ingredientID: id }), expectedReturnState);
    });

    it('should handle clearing all ingredients', () => {
        const unCheckedList = [{ id: chance.word() }, { id: chance.word() }];
        const checkedList = [{ id: chance.word(), checked: true }, { id: chance.word(), checked: true }, { id: chance.word(), checked: true }];
        const shoppingList = [...unCheckedList, ...checkedList];
        const expectedReturnState = { shoppingList: unCheckedList };

        assert.deepEqual(reducer({ shoppingList }, { type: CLEAR_CHECKED_INGREDIENTS }), expectedReturnState);
    });
});
