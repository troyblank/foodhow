import { assert } from 'chai';
import Chance from 'chance';
import { addIngredient,
        addIngredientType,
        checkIngredient,
        checkIngredientType,
        removeIngredient,
        removeIngredientType
        } from '../../assets/js/actions/index';

describe('Ingredients Actions', () => {
    const chance = new Chance();
    const id = chance.natural();
    const checked = chance.bool();
    const name = chance.word();
    const recipe = chance.word();

    it('should be able to generate an add ingredient action', () => {
        const action = addIngredient({ id, checked, name, recipe });

        assert.equal(action.type, addIngredientType);
        assert.equal(action.id, id);
        assert.equal(action.checked, checked);
        assert.equal(action.name, name);
        assert.equal(action.recipe, recipe);
    });

    it('generate an id on it\'s own', () => {
        const action = addIngredient({ name, recipe });

        assert.isTrue(0 < action.id);
    });

    it('should not be checked by default', () => {
        const action = addIngredient({ name, recipe });

        assert.isFalse(action.checked);
    });

    it('should be able to generate a check ingredient action', () => {
        const index = chance.natural();
        const action = checkIngredient(index);

        assert.equal(action.type, checkIngredientType);
        assert.equal(action.index, index);
    });

    it('should be able to generate a remove ingredient action', () => {
        const index = chance.natural();
        const action = removeIngredient(index);

        assert.equal(action.type, removeIngredientType);
        assert.equal(action.index, index);
    });
});
