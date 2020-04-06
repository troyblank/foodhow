import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Chance from 'chance';
import { IngredientListComponent } from './ingredientList';
import Ingredient from '../ingredient/ingredient';

describe('IngredientList', () => {
    const chance = new Chance();
    const shoppingList = {};
    const dispatch = sinon.spy();
    const title = chance.word();
    const ingredients = [chance.word(), chance.word(), chance.word()];
    const fileName = chance.word();

    it('should render', () => {
        const wrapper = shallow(
          <IngredientListComponent
            fileName={fileName}
            shoppingList={shoppingList}
            dispatch={dispatch}
            title={title}
            ingredients={ingredients}
          />
        );

        assert.isTrue(wrapper.contains(
          <React.Fragment>
            <h3 className={'ingredient__title'}>{title}</h3>
            <ul>
              <Ingredient
                fileName={fileName}
                text={ingredients[0]}
                shoppingList={shoppingList}
                dispatch={dispatch}
                key={ingredients[0]}
              />
              <Ingredient
                fileName={fileName}
                text={ingredients[1]}
                shoppingList={shoppingList}
                dispatch={dispatch}
                key={ingredients[1]}
              />
              <Ingredient
                fileName={fileName}
                text={ingredients[2]}
                shoppingList={shoppingList}
                dispatch={dispatch}
                key={ingredients[2]}
              />
            </ul>
          </React.Fragment>
        ));
    });

    it('should render without a title', () => {
        const wrapper = shallow(
          <IngredientListComponent
            fileName={fileName}
            shoppingList={shoppingList}
            dispatch={dispatch}
            title={null}
            ingredients={ingredients}
          />
        );

        assert.isFalse(wrapper.find('.ingredient__title').exists());
    });
});
