import { assert } from 'chai';
import Chance from 'chance';
import reducer from '../../assets/js/reducers/index';
import { addIngredientType, toggleIngredientType, removeIngredientType } from '../../assets/js/actions/index';

describe('Ingredients Reducer', () => {
    const chance = new Chance();
    const id = chance.natural();
    const checked = chance.bool();
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
                checked,
                name,
                recipe
            }),
            { ingredients: [{ id, checked, name, recipe }] }
        );

        assert.deepEqual(
            reducer({ ingredients: [] }, {
                type: addIngredientType,
                id,
                checked,
                name,
                recipe
            }),
            { ingredients: [{ id, checked, name, recipe }] },
            { ingredients: [{ id, checked, name, recipe }] }
        );
    });

    it('should handle checking an ingredient', () => {
        const state = reducer({ ingredients: [] }, {
            type: addIngredientType,
            id,
            name,
            recipe
        });

        assert.deepEqual(
            reducer(state, {
                type: toggleIngredientType,
                id
            }),
            { ingredients: [{ id, checked: true, name, recipe }] }
        );
    });

    it('should toggle back checking an ingredient', () => {
        const state = reducer({ ingredients: [] }, {
            type: addIngredientType,
            id,
            checked: true,
            name,
            recipe
        });

        assert.deepEqual(
            reducer(state, {
                type: toggleIngredientType,
                id
            }),
            { ingredients: [{ id, checked: false, name, recipe }] }
        );
    });

    it('should handle removing an ingredient', () => {
        const state = reducer({ ingredients: [] }, {
            type: addIngredientType,
            name,
            recipe
        });

        assert.deepEqual(
            reducer(state, {
                type: removeIngredientType,
                index: 0
            }),
            { ingredients: [] }
        );
    });
});
