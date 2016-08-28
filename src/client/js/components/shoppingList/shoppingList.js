import React, { Component } from 'react';
import styles from './shoppingList.scss';
import {
    Button,
    GetShoppingList,
    GotShoppingList,
    NoResultMessage }
    from '@troyblank/food-how-components';

let showNoResult, showClearButton, getIngredients, gotIngredients, noResultHeadline, noResultMessage;

export default class ShoppingList extends Component {

    constructor(props) {
        super(props);

        noResultHeadline = 'This list is empty';
        noResultMessage = 'There is no ingredients on your list, add some to make a shopping list.';

        this.ingredientClickHand = this.ingredientClickHand.bind(this);
        this.clearCheckedHand = this.clearCheckedHand.bind(this);
    }

    componentWillUpdate() {
        noResultHeadline = 'Done!';
        noResultMessage = 'Oh, so proud of you!';
    }

    ingredientClickHand(id) {
        this.props.toggleIngredient(id);
    }

    clearCheckedHand() {
        this.props.removeCheckedIngredients();
    }

    render() {
        getIngredients = this.props.ingredients.filter((ingredient) => !ingredient.checked);
        gotIngredients = this.props.ingredients.filter((ingredient) => ingredient.checked);
        showClearButton = 0 !== gotIngredients.length;
        showNoResult = 0 === this.props.ingredients.length;

        return (
          <section className={styles['shopping-list']}>
            {showNoResult && <NoResultMessage headline={noResultHeadline} message={noResultMessage} />}
            <GetShoppingList list={getIngredients} ingredientClickHand={this.ingredientClickHand} />
            {showClearButton && <Button text="Clear checked" buttonClickHand={this.clearCheckedHand} />}
            <GotShoppingList list={gotIngredients} ingredientClickHand={this.ingredientClickHand} />
          </section>
        );
    }
}
