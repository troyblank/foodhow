import { addIngredientType, removeIngredientType } from '../actions/ingredients';

export default function ingredients(state = [], action) {
    switch (action.type) {
    case addIngredientType:
        state.push({
            name: action.name,
            recipe: action.recipe
        });
        return state;
    case removeIngredientType:
        state.splice(action.index, 1);
        return state;
    default:
        return state;
    }
}
