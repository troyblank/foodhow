import React, { Component } from 'react';
import {
    GetShoppingList,
    NoResultMessage }
    from '@troyblank/food-how-components';

let ingredientNames, showNoResult;

export default class ShoppingList extends Component {
    constructor(props) {
        super(props);

        const ingredients = props.store.getState().ingredients;
        showNoResult = 0 === ingredients.length;
        ingredientNames = ingredients.map(obj => obj.name);
    }

    render() {
        return (
          <section>
            {showNoResult && <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />}
            <GetShoppingList list={ingredientNames} />
          </section>
        );
    }
}
