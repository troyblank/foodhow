import { addIngredientType, toggleIngredientType, removeIngredientType } from '../actions/ingredients';

export default function ingredients(state = [], action) {
    let toggleIndex, removeIndex;

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
        removeIndex = state.findIndex(ingredient => ingredient.name === action.name && ingredient.recipe === action.recipe);
        return [
            ...state.slice(0, removeIndex),
            ...state.slice(removeIndex + 1)
        ];
    default:
        return state;
    }
}
