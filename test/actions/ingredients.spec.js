import { assert } from 'chai';
import Chance from 'chance';
import { addIngredient, addIngredientType, removeIngredient, removeIngredientType } from '../../assets/js/actions/index';

describe('Ingredients Actions', () => {
    const chance = new Chance();

    it('should be able to generate an add ingredient action', () => {
        const name = chance.word();
        const recipe = chance.word();
        const action = addIngredient(name, recipe);

        assert.equal(action.type, addIngredientType);
        assert.equal(action.name, name);
        assert.equal(action.recipe, recipe);
    });

    it('should be able to generate a remove ingredient action', () => {
        const index = chance.natural();
        const action = removeIngredient(index);

        assert.equal(action.type, removeIngredientType);
        assert.equal(action.index, index);
    });
});
