import { assert } from 'chai';
import Chance from 'chance';
import store from '../../src/client/js/store';
import { addIngredient, toggleIngredient, removeIngredient } from '../../src/client/js/actions/index';

describe('Store', () => {
    const chance = new Chance();
    const id = chance.natural();
    const name = chance.word();
    const recipe = chance.word();

    after(() => {
        /* eslint-disable no-underscore-dangle */
        localStorage._deleteLocation();
        /* eslint-enable no-underscore-dangle */
    });

    it('should be able to dispatch and store an ingredient', () => {
        store.dispatch(addIngredient({ id, name, recipe }));

        const ingredients = JSON.parse(localStorage.getItem('food-how-ingredients'));

        assert.equal(ingredients.length, 1);
        assert.deepEqual(
            ingredients[0],
            { id, checked: false, name, recipe }
        );
    });

    it('should be able to dispatch and check an ingredient', () => {
        store.dispatch(toggleIngredient(id));

        const ingredients = JSON.parse(localStorage.getItem('food-how-ingredients'));

        assert.isTrue(ingredients[0].checked);
    });

    it('should be able to dispatch and remove an ingredient', () => {
        store.dispatch(removeIngredient(name, recipe));

        const ingredients = JSON.parse(localStorage.getItem('food-how-ingredients'));

        assert.equal(ingredients.length, 0);
    });
});
