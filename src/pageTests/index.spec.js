import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import list from '../../static/recipes.json';
import IndexPage from '../../pages/index';
import { Head, Navigation, RecipeList } from '../components';

describe('Page - Index', () => {
    it('should render', () => {
        const { recipes } = list;
        const wrapper = shallow(<IndexPage />);

        assert.isTrue(wrapper.contains(
          <x>
            <Head />
            <Navigation />
            <RecipeList recipes={recipes} />
          </x>
        ));
    });
});
