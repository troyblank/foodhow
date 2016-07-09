import { assert } from 'chai';
import Chance from 'chance';
import reducer from '../../assets/js/reducers/index';
import { addIngredientType } from '../../assets/js/actions/index';

describe('Ingredients Reducer', () => {
    const chance = new Chance();
    const name = chance.word();
    const recipe = chance.word();

    it('should return initial ingredient', () => {
        assert.deepEqual(
            reducer(undefined, {}),
            { ingredients: [] }
        );
    });

    it('should handle adding an ingredient', () => {
        assert.deepEqual(
            reducer({ ingredients: [] }, {
                type: addIngredientType,
                name,
                recipe
            }),
            { ingredients: [{ name, recipe }] }
        );

        assert.deepEqual(
            reducer({ ingredients: [] }, {
                type: addIngredientType,
                name,
                recipe
            }),
            { ingredients: [{ name, recipe }] },
            { ingredients: [{ name, recipe }] }
        );
    });
});
