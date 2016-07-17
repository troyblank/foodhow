import React, { Component } from 'react';
import {
    GetShoppingList,
    GotShoppingList,
    NoResultMessage }
    from '@troyblank/food-how-components';

let showNoResult, getIngredientNames, gotIngredientNames;

export default class ShoppingList extends Component {
    constructor(props) {
        super(props);

        const ingredients = props.store.getState().ingredients;
        const getIngredients = ingredients.filter((ingredient) => !ingredient.checked);
        const gotIngredients = ingredients.filter((ingredient) => ingredient.checked);
        showNoResult = 0 === ingredients.length;
        getIngredientNames = getIngredients.map(obj => obj.name);
        gotIngredientNames = gotIngredients.map(obj => obj.name);
    }

    render() {
        return (
          <section>
            {showNoResult && <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />}
            <GetShoppingList list={getIngredientNames} />
            <GotShoppingList list={gotIngredientNames} />
          </section>
        );
    }
}
