import React, { Component } from 'react';
import {
    Button,
    GetShoppingList,
    GotShoppingList,
    NoResultMessage
} from '@troyblank/food-how-components';
import styles from './shoppingList.scss';

let showNoResult, showClearButton, getIngredients, gotIngredients, noResultHeadline, noResultMessage;

export default class ShoppingList extends Component {
    /* istanbul ignore next */ // https://github.com/gotwarlost/istanbul/issues/690
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
        const { toggleIngredient } = this.props;

        toggleIngredient(id);
    }

    clearCheckedHand() {
        const { removeCheckedIngredients } = this.props;

        removeCheckedIngredients();
    }

    render() {
        const { ingredients } = this.props;

        getIngredients = ingredients.filter((ingredient) => !ingredient.checked);
        gotIngredients = ingredients.filter((ingredient) => ingredient.checked);
        showClearButton = 0 !== gotIngredients.length;
        showNoResult = 0 === ingredients.length;

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
