const addIngredientType = 'ADD_INGREDIENT';
const toggleIngredientType = 'TOGGLE_INGREDIENT';
const removeIngredientType = 'REMOVE_INGREDIENT';

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
export function removeIngredient(index) {
    return {
        type: removeIngredientType,
        index
    };
}
