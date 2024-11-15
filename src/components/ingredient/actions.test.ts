import Chance from 'chance';
import { TOGGLE_INGREDIENT_ON_LIST, toggleIngredientOnList } from './actions';

describe('Ingredient Actions', () => {
    const chance = new Chance();

    it('Should be able to generate an add ingredient action.', () => {
        const ingredient = chance.word();
        const action = toggleIngredientOnList(ingredient);

        expect( action ).toEqual( { type: TOGGLE_INGREDIENT_ON_LIST, ingredient } );
    });
});
