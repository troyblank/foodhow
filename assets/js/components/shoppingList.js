import React, { Component } from 'react';
import {
    GetShoppingList,
    GotShoppingList,
    NoResultMessage }
    from '@troyblank/food-how-components';

let showNoResult, getIngredients, gotIngredients;

export default class ShoppingList extends Component {
    constructor(props) {
        super(props);

        const ingredients = props.store.getState().ingredients;
        getIngredients = ingredients.filter((ingredient) => !ingredient.checked);
        gotIngredients = ingredients.filter((ingredient) => ingredient.checked);
        showNoResult = 0 === ingredients.length;
    }

    render() {
        return (
          <section>
            {showNoResult && <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />}
            <GetShoppingList list={getIngredients} />
            <GotShoppingList list={gotIngredients} />
          </section>
        );
    }
}
