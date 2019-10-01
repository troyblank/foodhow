import React from 'react';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Chance from 'chance';
import { Button, GetShoppingList, GotShoppingList, NoResultMessage } from '@troyblank/food-how-components';
import ShoppingList from './shoppingList';

describe('Shopping List', () => {
    const chance = new Chance();
    const noResultsMessage = { headline: chance.word(), body: chance.word() };

    it('should render', () => {
        const shoppingListStore = { noResultsMessage };
        const wrapper = shallow(<ShoppingList shoppingListStore={shoppingListStore} />);
        const instance = wrapper.instance();
        const { headline, body } = noResultsMessage;

        assert.isTrue(wrapper.contains(
          <section className={'shopping-list'}>
            <div className={'shopping-list__no-result-message'}>
              <NoResultMessage headline={headline} message={body} />
            </div>
            <GetShoppingList list={[]} ingredientClickHand={instance.onIngredientClick} />
            <GotShoppingList list={[]} ingredientClickHand={instance.onIngredientClick} />
          </section>
        ));
    });

    it('should render a list of ingredients to get', () => {
        const shoppingList = [{ text: chance.word(), checked: true }, { text: chance.word() }, { text: chance.word() }];
        const shoppingListStore = { shoppingList };
        const wrapper = shallow(<ShoppingList shoppingListStore={shoppingListStore} />);
        const instance = wrapper.instance();

        assert.isTrue(wrapper.contains(
          <section className={'shopping-list'}>
            <GetShoppingList list={[shoppingList[1], shoppingList[2]]} ingredientClickHand={instance.onIngredientClick} />
            <Button text="Clear checked" buttonClickHand={instance.onClear} />
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
        const wrapper = shallow(<ShoppingList shoppingListStore={shoppingListStore} />);
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
        const wrapper = mount(<ShoppingList shoppingListStore={shoppingListStore} dispatch={dispatch} />);
        const someIngredient = wrapper.find('.shopping-list li').at(chance.natural({ min: 0, max: 2 }));

        someIngredient.simulate('click', id);

        assert.isTrue(dispatch.calledOnce);
    });

    it('should handle clearing checked ingredients', () => {
        const dispatch = sinon.spy();
        const shoppingList = [
            { text: chance.word(), id: chance.word() },
            { text: chance.word(), checked: true, id: chance.word() },
            { text: chance.word(), checked: false, id: chance.word() }
        ];
        const shoppingListStore = { shoppingList };
        const wrapper = mount(<ShoppingList shoppingListStore={shoppingListStore} dispatch={dispatch} />);
        const clearButton = wrapper.find('.shopping-list button');

        clearButton.simulate('click');

        assert.isTrue(dispatch.calledOnce);
    });
});
