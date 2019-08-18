import { cloneDeep } from 'lodash';
import { ADD_INGREDIENT_TO_LIST } from '../recipe/actions';

export const initialState = {
    shoppingList: []
};

export default (state = initialState, action) => {
    const nextState = { ...state };
    const { shoppingList: oldShoppingList } = state;
    const shoppingList = cloneDeep(oldShoppingList);

    switch (action.type) {
    case ADD_INGREDIENT_TO_LIST:
        shoppingList.push(action.ingredient);

        nextState.shoppingList = shoppingList;
        break;
    default:
        return state;
    }

    return nextState;
};
