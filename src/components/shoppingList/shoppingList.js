import React, { PureComponent } from 'react';
import { Button, GetShoppingList, GotShoppingList } from '@troyblank/food-how-components';
import { toggleIngredientCheckMark, clearCheckedIngredients } from './actions';
import './shoppingList.scss';

export default class ShoppingList extends PureComponent {
    getDividedIngredientLists() {
        const { shoppingList: shoppingListStore } = this.props;
        const { shoppingList = [] } = shoppingListStore;
        const checked = [];
        const notChecked = [];

        shoppingList.forEach((i) => {
            const { checked: isChecked } = i;

            if (isChecked) checked.push(i);
            if (!isChecked) notChecked.push(i);
        });

        return { checked, notChecked };
    }

    onIngredientClick = (id) => {
        const { dispatch } = this.props;

        dispatch(toggleIngredientCheckMark(id));
    }

    onClear = () => {
        const { dispatch } = this.props;

        dispatch(clearCheckedIngredients());
    }

    render() {
        const { checked, notChecked } = this.getDividedIngredientLists();
        const hasCheckedIngredients = 0 < checked.length;

        return (
          <section className={'shopping-list'}>
            <GetShoppingList list={notChecked} ingredientClickHand={this.onIngredientClick} />
            {hasCheckedIngredients && <Button text="Clear checked" buttonClickHand={this.onClear} /> }
            <GotShoppingList list={checked} ingredientClickHand={this.onIngredientClick} />
          </section>
        );
    }
}
