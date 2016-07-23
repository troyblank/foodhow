import React from 'react';
import Chance from 'chance';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import ShoppingList from '../../assets/js/components/shoppingList';
import {
    GetShoppingList,
    GotShoppingList,
    NoResultMessage }
    from '@troyblank/food-how-components';

describe('Shopping List', () => {
    let ingredients = [];
    const chance = new Chance();
    const nameA = chance.word();
    const nameB = chance.word();
    const nameC = chance.word();
    const mockStore = {
        getState() {
            return { ingredients };
        }
    };

    it('should render a no results message', () => {
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.containsMatchingElement(
          <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />
        ));
        assert.isTrue(wrapper.containsMatchingElement(
          <GetShoppingList list={[]} />
        ));
        assert.isTrue(wrapper.containsMatchingElement(
          <GotShoppingList list={[]} />
        ));
    });

    it('should render a get shopping list', () => {
        ingredients = [
            { name: nameA, checked: false },
            { name: nameB, checked: false }
        ];
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.containsMatchingElement(
          <GetShoppingList list={ingredients} />
        ));
        assert.isTrue(wrapper.containsMatchingElement(
          <GotShoppingList list={[]} />
        ));
        assert.isFalse(wrapper.containsMatchingElement(
          <NoResultMessage />
        ));
    });

    it('should render a got shopping list', () => {
        ingredients = [
            { name: nameA, checked: true },
            { name: nameB, checked: true }
        ];
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.containsMatchingElement(
          <GetShoppingList list={[]} />
        ));
        assert.isTrue(wrapper.containsMatchingElement(
          <GotShoppingList list={ingredients} />
        ));
        assert.isFalse(wrapper.containsMatchingElement(
          <NoResultMessage />
        ));
    });

    it('should render a get and a got shopping list', () => {
        ingredients = [
            { name: nameA, checked: false },
            { name: nameB, checked: false },
            { name: nameC, checked: true }
        ];
        const getIngredients = ingredients.filter((ingredient) => !ingredient.checked);
        const gotIngredients = ingredients.filter((ingredient) => ingredient.checked);
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.containsMatchingElement(
          <GetShoppingList list={getIngredients} />
        ));
        assert.isTrue(wrapper.containsMatchingElement(
          <GotShoppingList list={gotIngredients} />
        ));
        assert.isFalse(wrapper.containsMatchingElement(
          <NoResultMessage />
        ));
    });
});
