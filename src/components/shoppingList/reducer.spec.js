import { assert } from 'chai';
import Chance from 'chance';
import reducer, { initialState } from './reducer';
import { ADD_INGREDIENT_TO_LIST } from '../recipe/actions';

describe('Shopping List Reducer', () => {
    const chance = new Chance();

    it('should return initial state', () => {
        assert.deepEqual(reducer(undefined, {}), { shoppingList: [] });
    });

    it('should handle adding an ingredient', () => {
        const ingredient = chance.word();
        const reduction = reducer(initialState, {
            type: ADD_INGREDIENT_TO_LIST,
            ingredient
        });
        const expectedReduction = {
            shoppingList: [ingredient]
        };

        assert.deepEqual(reduction, expectedReduction);
    });
});
