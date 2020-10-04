import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Chance from 'chance';
import Recipe from './recipe';
import IngredientList from '../ingredientList/ingredientList';

describe('Recipe', () => {
    const chance = new Chance();
    const fileName = chance.word();
    const title = chance.word();
    const meta = chance.word();
    const ingredients = [chance.word(), chance.word(), chance.word()];
    const multiStepIngredients = {
        [chance.word()]: [chance.word(), chance.word(), chance.word()],
        [chance.word()]: [chance.word(), chance.word(), chance.word()]
    };
    const directions = [chance.word(), chance.word(), chance.word()];
    const recipe = {
        title,
        meta,
        ingredients,
        directions
    };
    const shoppingList = [];
    const shoppingListStore = { shoppingList };
    const dispatch = chance.word();

    global.fetch = () => new Promise((resolve) => resolve(
        { json: () => new Promise((rresolve) => rresolve(recipe)) }
    ));

    it('should render', () => {
        const wrapper = shallow(<Recipe fileName={fileName} shoppingListStore={shoppingListStore} />);

        assert.equal(wrapper.type(), null);
    });

    it('should render a recipe after fetching recipe json', () => {
        const wrapper = shallow(
          <Recipe
            fileName={fileName}
            shoppingListStore={shoppingListStore}
            dispatch={dispatch}
          />
        );

        wrapper.setState({ recipe });

        assert.isTrue(wrapper.find('header').exists());
        assert.isTrue(wrapper.find(IngredientList).length === 1);
        assert.isTrue(wrapper.find('Directions').exists());
    });

    it('should render a recipe after fetching recipe with an ingredient object', () => {
        const multiStepIngredientsRecipe = { ...recipe, ingredients: multiStepIngredients };
        const wrapper = shallow(
          <Recipe
            fileName={fileName}
            shoppingListStore={shoppingListStore}
            dispatch={dispatch}
          />
        );

        wrapper.setState({ recipe: multiStepIngredientsRecipe });

        assert.isTrue(wrapper.find(IngredientList).length === 2);
    });
});
