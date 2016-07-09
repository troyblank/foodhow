import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import ShoppingList from '../../assets/js/components/shoppingList';
import { NoResultMessage } from '@troyblank/food-how-components/lib/index';

describe('Shopping List', () => {
    it('should render a get shopping list', () => {
        const wrapper = shallow(<ShoppingList />);

        assert.isTrue(wrapper.contains(
          <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />
        ));
    });
});
