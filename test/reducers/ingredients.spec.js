import { assert } from 'chai';
import Chance from 'chance';
import reducer from '../../assets/js/reducers/index';
import { addIngredientType, removeIngredientType } from '../../assets/js/actions/index';

describe('Ingredients Reducer', () => {
    const chance = new Chance();
    const id = chance.natural();
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
                id,
                name,
                recipe
            }),
            { ingredients: [{ id, name, recipe }] }
        );

        assert.deepEqual(
            reducer({ ingredients: [] }, {
                type: addIngredientType,
                id,
                name,
                recipe
            }),
            { ingredients: [{ id, name, recipe }] },
            { ingredients: [{ id, name, recipe }] }
        );
    });

    it('should handle removing an ingredient', () => {
        reducer({ ingredients: [] }, {
            type: addIngredientType,
            name,
            recipe
        });

        assert.deepEqual(
            reducer({ ingredients: [] }, {
                type: removeIngredientType,
                index: 0
            }),
            { ingredients: [] }
        );
    });
});
