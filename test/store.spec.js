
import 'mock-local-storage';
import { assert } from 'chai';
import Chance from 'chance';
import store from '../assets/js/store';
import { addIngredient } from '../assets/js/actions/index';

describe('Store', () => {
    const chance = new Chance();
    const name = chance.word();
    const recipe = chance.word();

    it('should be able to dispatch and store an ingredient', () => {
        store.dispatch(addIngredient(name, recipe));

        const ingredients = JSON.parse(localStorage.getItem('food-how-ingredients'));

        assert.equal(ingredients.length, 1);
        assert.deepEqual(
            ingredients[0],
            { name, recipe }
        );
    });
});
