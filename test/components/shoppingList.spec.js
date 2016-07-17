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

        assert.isTrue(wrapper.contains(
          <section>
            <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />
            <GetShoppingList list={[]} />
            <GotShoppingList list={[]} />
          </section>
        ));
    });

    it('should render a get shopping list', () => {
        ingredients = [
            { name: nameA, checked: false },
            { name: nameB, checked: false }
        ];
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.contains(
          <section>
            <GetShoppingList list={[nameA, nameB]} />
            <GotShoppingList list={[]} />
          </section>
        ));
    });

    it('should render a got shopping list', () => {
        ingredients = [
            { name: nameA, checked: true },
            { name: nameB, checked: true }
        ];
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.contains(
          <section>
            <GetShoppingList list={[]} />
            <GotShoppingList list={[nameA, nameB]} />
          </section>
        ));
    });

    it('should render a get and a got shopping list', () => {
        ingredients = [
            { name: nameA, checked: false },
            { name: nameB, checked: false },
            { name: nameC, checked: true }
        ];
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.contains(
          <section>
            <GetShoppingList list={[nameA, nameB]} />
            <GotShoppingList list={[nameC]} />
          </section>
        ));
    });
});
