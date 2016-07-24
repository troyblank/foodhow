import React, { Component } from 'react';
import { toggleIngredient } from '../actions/index';
import {
    GetShoppingList,
    GotShoppingList,
    NoResultMessage }
    from '@troyblank/food-how-components';

let store, showNoResult, getIngredients, gotIngredients;

export default class ShoppingList extends Component {
    constructor(props) {
        super(props);

        const ingredients = props.store.getState().ingredients;
        store = props.store;
        getIngredients = ingredients.filter((ingredient) => !ingredient.checked);
        gotIngredients = ingredients.filter((ingredient) => ingredient.checked);
        showNoResult = 0 === ingredients.length;
    }

    ingredientClickHand(id) {
        store.dispatch(toggleIngredient(id));
    }

    render() {
        return (
          <section>
            {showNoResult && <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />}
            <GetShoppingList list={getIngredients} ingredientClickHand={this.ingredientClickHand} />
            <GotShoppingList list={gotIngredients} ingredientClickHand={this.ingredientClickHand} />
          </section>
        );
    }
}
