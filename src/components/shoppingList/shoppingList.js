import React, { PureComponent } from 'react';

export default class ShoppingList extends PureComponent {
    getDividedIngredientLists() {
        const { shoppingList: shoppingListStore } = this.props;
        const { shoppingList } = shoppingListStore;

        return shoppingList;
    }

    render() {
        const toGetList = this.getDividedIngredientLists();

        return (
          <section className={'shopping-list'}>
            { toGetList && (
              <ul>
                { toGetList.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.text}</li>
                ))}
              </ul>
            )}
          </section>
        );
    }
}
