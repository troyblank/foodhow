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

        assert.isTrue(wrapper.contains(
          <section className={'recipe'}>
            <header>
              <h1>{ title }</h1>
              <h3>{meta}</h3>
            </header>
            <section>
              <h2>Ingredients</h2>
              <IngredientList
                title={''}
                ingredients={ingredients}
                fileName={fileName}
                key={''}
              />
            </section>
            <section>
              <h2>Directions</h2>
              <ol>
                <li dangerouslySetInnerHTML={{ __html: directions[0] }} />
                <li dangerouslySetInnerHTML={{ __html: directions[1] }} />
                <li dangerouslySetInnerHTML={{ __html: directions[2] }} />
              </ol>
            </section>
          </section>
        ));
    });

    it('should render a recipe after fetching recipe with an ingredient object', () => {
        const multiStepIngredientsRecipe = { ...recipe, ingredients: multiStepIngredients };
        const titles = Object.keys(multiStepIngredients);
        const wrapper = shallow(
          <Recipe
            fileName={fileName}
            shoppingListStore={shoppingListStore}
            dispatch={dispatch}
          />
        );

        wrapper.setState({ recipe: multiStepIngredientsRecipe });

        assert.isTrue(wrapper.contains(
          <section>
            <h2>Ingredients</h2>
            <IngredientList
              title={titles[0]}
              ingredients={multiStepIngredients[titles[0]]}
              fileName={fileName}
              key={titles[0]}
            />
            <IngredientList
              title={titles[1]}
              ingredients={multiStepIngredients[titles[1]]}
              fileName={fileName}
              key={titles[1]}
            />
          </section>
        ));
    });
});
