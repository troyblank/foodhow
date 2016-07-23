import { addIngredientType, toggleIngredientType, removeIngredientType } from '../actions/ingredients';

export default function ingredients(state = [], action) {
    let toggleIndex;
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
    case toggleIngredientType:
        toggleIndex = newState.findIndex(ingredient => ingredient.id === action.id);
        newState[toggleIndex].checked = !newState[toggleIndex].checked;
        return newState;
    case removeIngredientType:
        newState.splice(action.index, 1);
        return newState;
    default:
        return state;
    }
}
