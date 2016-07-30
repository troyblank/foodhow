import { addIngredientType, toggleIngredientType, removeIngredientType } from '../actions/ingredients';

export default function ingredients(state = [], action) {
    let toggleIndex;

    switch (action.type) {
    case addIngredientType:
        return [
            ...state,
            {
                id: action.id,
                checked: action.checked,
                name: action.name,
                recipe: action.recipe
            }
        ];
    case toggleIngredientType:
        toggleIndex = state.findIndex(ingredient => ingredient.id === action.id);
        return [
            ...state.slice(0, toggleIndex),
            { ...state[toggleIndex], checked: !state[toggleIndex].checked },
            ...state.slice(toggleIndex + 1)
        ];
    case removeIngredientType:
        return [
            ...state.slice(0, action.index),
            ...state.slice(action.index + 1)
        ];
    default:
        return state;
    }
}
