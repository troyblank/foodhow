import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Chance from 'chance';
import ShoppingList from './shoppingList';

describe('Shopping List', () => {
    const chance = new Chance();

    it('should render', () => {
        const shoppingListStore = {};
        const wrapper = shallow(<ShoppingList shoppingList={shoppingListStore} />);

        assert.isTrue(wrapper.contains(
          <section className={'shopping-list'} />
        ));
    });

    it('should render a list of ingredients to get', () => {
        const shoppingList = [{ text: chance.word() }, { text: chance.word() }, { text: chance.word() }];
        const shoppingListStore = { shoppingList };
        const wrapper = shallow(<ShoppingList shoppingList={shoppingListStore} />);

        assert.isTrue(wrapper.contains(
          <section className={'shopping-list'}>
            <ul>
              <li>{shoppingList[0].text}</li>
              <li>{shoppingList[1].text}</li>
              <li>{shoppingList[2].text}</li>
            </ul>
          </section>
        ));
    });

    it('should be able to get a divided shopping list', () => {
        const shoppingList = [{ text: chance.word() }, { text: chance.word() }, { text: chance.word() }];
        const shoppingListStore = { shoppingList };
        const wrapper = shallow(<ShoppingList shoppingList={shoppingListStore} />);
        const instance = wrapper.instance();

        assert.deepEqual(instance.getDividedIngredientLists(), shoppingList);
    });
});
