import React from 'react';
import Chance from 'chance';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Link from 'next/link';
import RecipeList from './recipeList';

describe('Recipe List', () => {
    const chance = new Chance();

    it('should render', () => {
        const recipes = [chance.word(), chance.word(), chance.word()];
        const wrapper = shallow(<RecipeList recipes={recipes} />);

        assert.isTrue(wrapper.contains(
          <>
            <header className={'recipe-list__header'}>
              <h1>Food How</h1>
              <p>Food How is a place on how to make food. You will find recipes on this site that are used to make foods that are probably pretty good to eat.</p>
            </header>
            <section className={'recipe-list__nodes'}>
              <Link href={'/recipe/[recipe]'} as={`/recipe/${recipes[0]}`}>
                <a>{recipes[0]}</a>
              </Link>
              <Link href={'/recipe/[recipe]'} as={`/recipe/${recipes[1]}`}>
                <a>{recipes[1]}</a>
              </Link>
              <Link href={'/recipe/[recipe]'} as={`/recipe/${recipes[2]}`}>
                <a>{recipes[2]}</a>
              </Link>
            </section>
          </>
        ));
    });
});
