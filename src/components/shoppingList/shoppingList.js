import React, { PureComponent } from 'react';
import { GetShoppingList, GotShoppingList } from '@troyblank/food-how-components';
import { toggleIngredientCheckMark } from './actions';

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

    render() {
        const { checked, notChecked } = this.getDividedIngredientLists();

        return (
          <section className={'shopping-list'}>
            <GetShoppingList list={notChecked} ingredientClickHand={this.onIngredientClick} />
            <GotShoppingList list={checked} ingredientClickHand={this.onIngredientClick} />
          </section>
        );
    }
}
