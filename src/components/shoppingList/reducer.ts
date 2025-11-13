import { cloneDeep, xorBy } from 'lodash';
import { TOGGLE_INGREDIENT_ON_LIST } from '../ingredient/actions';
import { TOGGLE_INGREDIENT_CHECK_MARK } from './actions';

export const foodHowShoppingList = 'FOOD_HOW_SHOPPING_LIST';

export const initialState = {
    shoppingList: typeof localStorage !== 'undefined' ? (JSON.parse(localStorage.getItem(foodHowShoppingList)) || []) : /* istanbul ignore next */ [],
    noResultsMessage: {
        headline: 'This list is empty.',
        body: 'There is no ingredients on your list, add some to make a shopping list.'
    }
};

export default (state = initialState, action) => {
    const nextState = { ...state };
    const { shoppingList: oldShoppingList } = state;

    switch (action.type) {
    case TOGGLE_INGREDIENT_ON_LIST:
        nextState.shoppingList = xorBy(oldShoppingList, [action.ingredient], 'id');
        break;
    case TOGGLE_INGREDIENT_CHECK_MARK: {
        const shoppingList = cloneDeep(oldShoppingList);
        const index = shoppingList.findIndex((i) => i.id === action.ingredientID);

        shoppingList[index].checked = !shoppingList[index].checked;
        nextState.shoppingList = shoppingList;
        break;
    }
    default:
        return state;
    }

    return nextState;
};
