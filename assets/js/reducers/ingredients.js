import { addIngredientType, checkIngredientType, removeIngredientType } from '../actions/ingredients';

export default function ingredients(state = [], action) {
    const newState = state;
    switch (action.type) {
    case addIngredientType:
        newState.push({
            id: action.id,
            checked: action.checked,
            name: action.name,
            recipe: action.recipe
        });
        return newState;
    case checkIngredientType:
        newState[action.index].checked = !newState[action.index].checked;
        return newState;
    case removeIngredientType:
        newState.splice(action.index, 1);
        return newState;
    default:
        return state;
    }
}
