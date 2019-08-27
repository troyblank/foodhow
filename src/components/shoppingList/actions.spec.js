import { assert } from 'chai';
import Chance from 'chance';
import { TOGGLE_INGREDIENT_CHECK_MARK, toggleIngredientCheckMark } from './actions';

describe('Shopping List Actions', () => {
    const chance = new Chance();

    it('should be able to generate an toggle ingredient check action', () => {
        const ingredientID = chance.word();
        const action = toggleIngredientCheckMark(ingredientID);

        assert.deepEqual(action, { type: TOGGLE_INGREDIENT_CHECK_MARK, ingredientID });
    });
});
