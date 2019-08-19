import { xorBy } from 'lodash';
import { TOGGLE_INGREDIENT_ON_LIST } from '../ingredient/actions';

export const initialState = {
    shoppingList: []
};

export default (state = initialState, action) => {
    const nextState = { ...state };
    const { shoppingList: oldShoppingList } = state;

    switch (action.type) {
    case TOGGLE_INGREDIENT_ON_LIST:
        nextState.shoppingList = xorBy(oldShoppingList, [action.ingredient], 'id');
        break;
    default:
        return state;
    }

    return nextState;
};
