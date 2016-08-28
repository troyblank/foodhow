import { assert } from 'chai';
import Chance from 'chance';
import reducer from '../../src/client/js/reducers/index';
import { addIngredientType, toggleIngredientType, removeIngredientType, removeCheckedIngredientsType } from '../../src/client/js/actions/index';

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
                name,
                recipe
            }),
            { ingredients: [] }
        );
    });

    it('should handle removing checked ingredients', () => {
        const state = { ingredients: [
            {
                id: 1,
                checked: false
            },
            {
                id: 2,
                checked: true
            },
            {
                id: 3,
                checked: true
            }
        ] };

        assert.deepEqual(
            reducer(state, {
                type: removeCheckedIngredientsType
            }),
            { ingredients: [{
                id: 1,
                checked: false
            }] }
        );
    });
});
