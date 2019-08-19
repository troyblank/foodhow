import { assert } from 'chai';
import Chance from 'chance';
import reducer, { initialState } from './reducer';
import { TOGGLE_INGREDIENT_ON_LIST } from '../ingredient/actions';

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
});
