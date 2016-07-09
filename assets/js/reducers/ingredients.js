import { addIngredientType } from '../actions/ingredients';

export default function ingredients(state = [], action) {
    switch (action.type) {
    case addIngredientType:
        state.push({
            name: action.name,
            recipe: action.recipe
        });
        return state;
    default:
        return state;
    }
}
