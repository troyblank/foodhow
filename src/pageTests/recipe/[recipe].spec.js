import React from 'react';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { RouterContext } from 'next-server/dist/lib/router-context';
import Chance from 'chance';
import RecipePage from '../../../pages/recipe/[recipe]';
import { Head, Navigation, Recipe } from '../../components';

describe('Page - [Recipe]', () => {
    const chance = new Chance();

    it('should render', () => {
        const wrapper = shallow(<RecipePage />);

        assert.isTrue(wrapper.contains(
          <x>
            <Head />
            <Navigation />
          </x>
        ));
    });

    it('should render with the recipe query', () => {
        const recipe = chance.word();
        const mockRouter = { query: { recipe } };
        // istanbul ignore next
        const mockStore = {
            getState: () => ({ recipe }),
            subscribe: () => {},
            dispatch: () => {}
        };
        const wrapper = mount(
          <Provider store={mockStore}>
            <RouterContext.Provider value={mockRouter}>
              <RecipePage />
            </RouterContext.Provider>
          </Provider>
        );

        assert.isTrue(wrapper.contains(
          <x>
            <Head />
            <Navigation />
            <Recipe fileName={recipe} />
          </x>
        ));
    });
});
