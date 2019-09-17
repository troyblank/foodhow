import React from 'react';
import Chance from 'chance';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Link from 'next/link';
import RecipeList from './recipeList';

describe('Recipe List', () => {
    const chance = new Chance();

    it('should render', () => {
        const recipes = [chance.word(), chance.word(), chance.word()];
        const wrapper = shallow(<RecipeList recipes={recipes} />);
        const instance = wrapper.instance();

        assert.isTrue(wrapper.contains(
          <x>
            <header className={'recipe-list__header'}>
              <h1>Food How</h1>
              <p>Food How is a place on how to make food. You will find recipes on this site that are used to make foods that are probably pretty good to eat.</p>
            </header>
            <section className={'recipe-list__search'}>
              <input
                type={'text'}
                name={'search'}
                placeholder={'Search'}
                onChange={instance.onChange}
              />
            </section>
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
          </x>
        ));
    });

    it('should filter list when input has changed', () => {
        const wrapper = shallow(<RecipeList />);
        const instance = wrapper.instance();
        const filterList = sinon.spy(instance, 'filterList');
        const input = wrapper.find('input');

        input.simulate('change');

        assert.isTrue(filterList.calledOnce);
    });

    it('should be able to filter a recipe list', () => {
        const recipes = ['beer', 'beef', 'fish'];
        const wrapper = shallow(<RecipeList recipes={recipes} />);
        const instance = wrapper.instance();

        instance.filterList('bee');

        assert.deepEqual(instance.state.recipes, ['beer', 'beef']);
    });
});
