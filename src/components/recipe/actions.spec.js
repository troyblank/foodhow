import { assert } from 'chai';
import Chance from 'chance';
import { ADD_INGREDIENT_TO_LIST, addIngredientToList } from './actions';

describe('Recipe Actions', () => {
    const chance = new Chance();

    it('should be able to generate an add ingredient action', () => {
        const ingredient = chance.word();
        const action = addIngredientToList(ingredient);

        assert.deepEqual(action, { type: ADD_INGREDIENT_TO_LIST, ingredient });
    });
});
