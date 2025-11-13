import Chance from 'chance';
import {
    TOGGLE_INGREDIENT_CHECK_MARK,
    toggleIngredientCheckMark
} from './actions';

describe('Shopping List Actions', () => {
    const chance = new Chance();

    it('Should be able to generate an toggle ingredient check action.', () => {
        const ingredientID = chance.word();
        const action = toggleIngredientCheckMark(ingredientID);

        expect(action).toEqual({ type: TOGGLE_INGREDIENT_CHECK_MARK, ingredientID });
    });
});
