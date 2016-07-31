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

        this.ingredientClickHand = this.ingredientClickHand.bind(this);
    }

    ingredientClickHand(id) {
        this.props.toggleIngredient(id);
    }

    render() {
        getIngredients = this.props.ingredients.filter((ingredient) => !ingredient.checked);
        gotIngredients = this.props.ingredients.filter((ingredient) => ingredient.checked);
        showNoResult = 0 === this.props.ingredients.length;

        return (
          <section>
            {showNoResult && <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />}
            <GetShoppingList list={getIngredients} ingredientClickHand={this.ingredientClickHand} />
            <GotShoppingList list={gotIngredients} ingredientClickHand={this.ingredientClickHand} />
          </section>
        );
    }
}
