const addIngredientType = 'ADD_INGREDIENT';
const toggleIngredientType = 'TOGGLE_INGREDIENT';
const removeIngredientType = 'REMOVE_INGREDIENT';
const removeCheckedIngredientsType = 'REMOVE_CHECKED_INGREDIENTS';

export { addIngredientType };
export function addIngredient({ id = new Date().getTime(), checked = false, name, recipe }) {
    return {
        type: addIngredientType,
        id,
        checked,
        name,
        recipe
    };
}

export { toggleIngredientType };
export function toggleIngredient(id) {
    return {
        type: toggleIngredientType,
        id
    };
}

export { removeIngredientType };
export function removeIngredient(name, recipe) {
    return {
        type: removeIngredientType,
        name,
        recipe
    };
}

export { removeCheckedIngredientsType };
export function removeCheckedIngredients() {
    return {
        type: removeCheckedIngredientsType
    };
}