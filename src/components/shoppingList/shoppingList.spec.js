import React from 'react';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Chance from 'chance';
import { GetShoppingList, GotShoppingList } from '@troyblank/food-how-components';
import ShoppingList from './shoppingList';

describe('Shopping List', () => {
    const chance = new Chance();

    it('should render', () => {
        const shoppingListStore = {};
        const wrapper = shallow(<ShoppingList shoppingList={shoppingListStore} />);
        const instance = wrapper.instance();

        assert.isTrue(wrapper.contains(
          <section className={'shopping-list'}>
            <GetShoppingList list={[]} ingredientClickHand={instance.onIngredientClick} />
            <GotShoppingList list={[]} ingredientClickHand={instance.onIngredientClick} />
          </section>
        ));
    });

    it('should render a list of ingredients to get', () => {
        const shoppingList = [{ text: chance.word(), checked: true }, { text: chance.word() }, { text: chance.word() }];
        const shoppingListStore = { shoppingList };
        const wrapper = shallow(<ShoppingList shoppingList={shoppingListStore} />);
        const instance = wrapper.instance();

        assert.isTrue(wrapper.contains(
          <section className={'shopping-list'}>
            <GetShoppingList list={[shoppingList[1], shoppingList[2]]} ingredientClickHand={instance.onIngredientClick} />
            <GotShoppingList list={[shoppingList[0]]} ingredientClickHand={instance.onIngredientClick} />
          </section>
        ));
    });

    it('should be able to get a divided shopping list', () => {
        const shoppingList = [
            { text: chance.word(), id: chance.word() },
            { text: chance.word(), checked: true, id: chance.word() },
            { text: chance.word(), checked: false, id: chance.word() }
        ];
        const shoppingListStore = { shoppingList };
        const expectedOutput = { checked: [shoppingList[1]], notChecked: [shoppingList[0], shoppingList[2]] };
        const wrapper = shallow(<ShoppingList shoppingList={shoppingListStore} />);
        const instance = wrapper.instance();

        assert.deepEqual(instance.getDividedIngredientLists(), expectedOutput);
    });

    it('should handle click an ingredient', () => {
        const dispatch = sinon.spy();
        const id = chance.word();
        const shoppingList = [
            { text: chance.word(), id: chance.word() },
            { text: chance.word(), checked: true, id: chance.word() },
            { text: chance.word(), checked: false, id: chance.word() }
        ];
        const shoppingListStore = { shoppingList };
        const wrapper = mount(<ShoppingList shoppingList={shoppingListStore} dispatch={dispatch} />);
        const someIngredient = wrapper.find('.shopping-list li').at(chance.natural({ min: 0, max: 2 }));

        someIngredient.simulate('click', id);

        assert.isTrue(dispatch.calledOnce);
    });
});
