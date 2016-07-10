import React from 'react';
import Chance from 'chance';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import ShoppingList from '../../assets/js/components/shoppingList';
import {
    GetShoppingList,
    NoResultMessage }
    from '@troyblank/food-how-components/lib/index';

describe('Shopping List', () => {
    const chance = new Chance();
    const nameA = chance.word();
    const nameB = chance.word();
    const mockStore = {
        getState() {
            return { ingredients: [{ name: nameA }, { name: nameB }] };
        }
    };

    it('should render a get shopping list', () => {
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.contains(
          <section>
            <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />
            <GetShoppingList list={[nameA, nameB]} />
          </section>
        ));
    });
});
