import { assert } from 'chai';
import Chance from 'chance';
import {
    TOGGLE_INGREDIENT_CHECK_MARK,
    CLEAR_CHECKED_INGREDIENTS,
    toggleIngredientCheckMark,
    clearCheckedIngredients
} from './actions';

describe('Shopping List Actions', () => {
    const chance = new Chance();

    it('should be able to generate an toggle ingredient check action', () => {
        const ingredientID = chance.word();
        const action = toggleIngredientCheckMark(ingredientID);

        assert.deepEqual(action, { type: TOGGLE_INGREDIENT_CHECK_MARK, ingredientID });
    });

    it('should be able to generate an clear checked ingredients action', () => {
        const action = clearCheckedIngredients();

        assert.deepEqual(action, { type: CLEAR_CHECKED_INGREDIENTS });
    });
});
