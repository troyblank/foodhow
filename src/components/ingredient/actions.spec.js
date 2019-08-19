import { assert } from 'chai';
import Chance from 'chance';
import { TOGGLE_INGREDIENT_ON_LIST, toggleIngredientOnList } from './actions';

describe('Ingredient Actions', () => {
    const chance = new Chance();

    it('should be able to generate an add ingredient action', () => {
        const ingredient = chance.word();
        const action = toggleIngredientOnList(ingredient);

        assert.deepEqual(action, { type: TOGGLE_INGREDIENT_ON_LIST, ingredient });
    });
});
