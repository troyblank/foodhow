import React from 'react';
import Chance from 'chance';
import styles from '../helpers/style-fakes';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import ShoppingList from '../../src/client/js/components/shoppingList/shoppingList';
import {
    Button,
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

    const actionMocks = {
        mockToggleIngredient() {
            return true;
        },
        mockClearChecked() {
            return true;
        }
    };

    beforeEach(() => {
        ingredients = [];
    });

    it('should render a no results message', () => {
        const wrapper = shallow(<ShoppingList ingredients={ingredients} />);
        const ingredientClickHand = wrapper.instance().ingredientClickHand;

        assert.isTrue(wrapper.contains(
          <section className={styles['shopping-list']}>
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
        const wrapper = shallow(<ShoppingList ingredients={ingredients} />);
        const ingredientClickHand = wrapper.instance().ingredientClickHand;

        assert.isTrue(wrapper.contains(
          <section className={styles['shopping-list']}>
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
        const wrapper = shallow(<ShoppingList ingredients={ingredients} />);
        const ingredientClickHand = wrapper.instance().ingredientClickHand;
        const clearCheckedHand = wrapper.instance().clearCheckedHand;

        assert.isTrue(wrapper.contains(
          <section className={styles['shopping-list']}>
            <GetShoppingList list={[]} ingredientClickHand={ingredientClickHand} />
            <Button text="Clear checked" buttonClickHand={clearCheckedHand} />
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
        const wrapper = shallow(<ShoppingList ingredients={ingredients} />);
        const ingredientClickHand = wrapper.instance().ingredientClickHand;
        const clearCheckedHand = wrapper.instance().clearCheckedHand;

        assert.isTrue(wrapper.contains(
          <section className={styles['shopping-list']}>
            <GetShoppingList list={getIngredients} ingredientClickHand={ingredientClickHand} />
            <Button text="Clear checked" buttonClickHand={clearCheckedHand} />
            <GotShoppingList list={gotIngredients} ingredientClickHand={ingredientClickHand} />
          </section>
        ));
    });

    it('should handle ingredient toggling', () => {
        const toggleIngredient = sinon.spy(actionMocks, 'mockToggleIngredient');
        const ShoppingListPrototype = ShoppingList.prototype;
        const id = chance.natural();
        sinon.spy(ShoppingListPrototype, 'ingredientClickHand');
        ingredients = [
            { name: nameA, checked: false, id },
            { name: nameB, checked: false }
        ];

        const wrapper = mount(<ShoppingList ingredients={ingredients} toggleIngredient={actionMocks.mockToggleIngredient} />);

        wrapper.find('li').at(0).simulate('click');

        assert.isTrue(ShoppingListPrototype.ingredientClickHand.calledOnce);
        assert.isTrue(Number(ShoppingListPrototype.ingredientClickHand.args[0]) === id);
        assert.isTrue(toggleIngredient.calledOnce);
    });

    it('should handle removing all checked ingredients', () => {
        const clearChecked = sinon.spy(actionMocks, 'mockClearChecked');
        const ShoppingListPrototype = ShoppingList.prototype;
        sinon.spy(ShoppingListPrototype, 'clearCheckedHand');
        ingredients = [
            { name: nameA, checked: false },
            { name: nameB, checked: true }
        ];

        const wrapper = mount(<ShoppingList ingredients={ingredients} removeCheckedIngredients={actionMocks.mockClearChecked} />);

        wrapper.find('button').simulate('click');

        assert.isTrue(ShoppingListPrototype.clearCheckedHand.calledOnce);
        assert.isTrue(clearChecked.calledOnce);
    });

    it('should render a done message', () => {
        ingredients = [
            { name: nameA, checked: true }
        ];

        const wrapper = shallow(<ShoppingList ingredients={ingredients} />);
        const ingredientClickHand = wrapper.instance().ingredientClickHand;

        wrapper.setProps({ ingredients: [] });

        assert.isTrue(wrapper.contains(
          <section className={styles['shopping-list']}>
            <NoResultMessage headline={'Done!'} message={'Oh, so proud of you!'} />
            <GetShoppingList list={[]} ingredientClickHand={ingredientClickHand} />
            <GotShoppingList list={[]} ingredientClickHand={ingredientClickHand} />
          </section>
        ));
    });
});
