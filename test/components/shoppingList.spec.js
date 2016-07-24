import React from 'react';
import Chance from 'chance';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
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
    const ingredientClickHand = ShoppingList.prototype.ingredientClickHand;
    const mockStore = {
        getState() {
            return { ingredients };
        },
        dispatch() {}
    };

    beforeEach(() => {
        ingredients = [];
    });

    it('should render a no results message', () => {
        const wrapper = shallow(<ShoppingList store={mockStore} />);

        assert.isTrue(wrapper.contains(
          <section>
            <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />
            <GetShoppingList list={[]} ingredientClickHand={ingredientClickHand} />
            <GotShoppingList list={[]} ingredientClickHand={ingredientClickHand} />
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
            <GetShoppingList list={ingredients} ingredientClickHand={ingredientClickHand} />
            <GotShoppingList list={[]} ingredientClickHand={ingredientClickHand} />
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
            <GetShoppingList list={[]} ingredientClickHand={ingredientClickHand} />
            <GotShoppingList list={ingredients} ingredientClickHand={ingredientClickHand} />
          </section>
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

        assert.isTrue(wrapper.contains(
          <section>
            <GetShoppingList list={getIngredients} ingredientClickHand={ingredientClickHand} />
            <GotShoppingList list={gotIngredients} ingredientClickHand={ingredientClickHand} />
          </section>
        ));
    });

    it('should handle ingredient toggling', () => {
        const storeDispatch = sinon.spy(mockStore, 'dispatch');
        const ShoppingListPrototype = ShoppingList.prototype;
        const id = chance.natural();
        sinon.spy(ShoppingListPrototype, 'ingredientClickHand');
        ingredients = [
            { name: nameA, checked: false, id },
            { name: nameB, checked: false }
        ];

        const wrapper = mount(<ShoppingList store={mockStore} />);

        wrapper.find('li').at(0).simulate('click');

        assert.isTrue(ShoppingListPrototype.ingredientClickHand.calledOnce);
        assert.isTrue(Number(ShoppingListPrototype.ingredientClickHand.args[0]) === id);
        assert.isTrue(storeDispatch.calledOnce);
    });
});
