import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Chance from 'chance';
import ShoppingListPage from '../../pages/shoppingList';
import { Head, Navigation } from '../components';
import { ShoppingList } from '../components/connections';

describe('Page - Shopping List', () => {
    const chance = new Chance();

    it('should render', () => {
        const shoppingList = chance.word();
        // istanbul ignore next
        const mockStore = {
            getState: () => ({ shoppingList }),
            subscribe: () => {},
            dispatch: () => {}
        };

        const wrapper = mount(
          <Provider store={mockStore}>
            <ShoppingListPage />
          </Provider>
        );

        assert.isTrue(wrapper.contains(
          <x>
            <Head />
            <Navigation />
            <ShoppingList />
          </x>
        ));
    });
});
