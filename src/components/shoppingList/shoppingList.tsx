import React, { type FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, GetShoppingList, GotShoppingList, NoResultMessage } from '@troyblank/food-how-components';
import { useAuth } from '../../contexts';
import { toggleIngredientCheckMark, clearCheckedIngredients } from './actions';

export const ShoppingList: FunctionComponent = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const shoppingListStore = useSelector(({ shoppingList }) => shoppingList);
    const { shoppingList = [], noResultsMessage = {} } = shoppingListStore;
    const { headline = '', body = '' } = noResultsMessage;

    const getDividedIngredientLists = () => {
        const { shoppingList = [] } = shoppingListStore;
        const checked = [];
        const notChecked = [];

        shoppingList.forEach((ingredient) => {
            const { checked: isChecked } = ingredient;

            if (isChecked) checked.push(ingredient);
            if (!isChecked) notChecked.push(ingredient);
        });

        return { checked, notChecked };
    };

    const { checked, notChecked } = getDividedIngredientLists();

    const onIngredientClick = (id) => dispatch(toggleIngredientCheckMark(id));

    const onClear = () => dispatch(clearCheckedIngredients());

    const isEmpty = 0 === shoppingList.length;
    const isAnyIngredientsChecked = 0 < checked.length;

    return (
      <section className={'shopping-list'}>
        {isEmpty && (
          <div className={'shopping-list__no-result-message'}>
            <NoResultMessage headline={headline} message={body} />
          </div>
            )}
        <GetShoppingList list={notChecked} ingredientClickHand={onIngredientClick} />
        {isAnyIngredientsChecked && <Button text={'Clear checked'} buttonClickHand={onClear} /> }
        <GotShoppingList list={checked} ingredientClickHand={onIngredientClick} />
      </section>
    );
};
