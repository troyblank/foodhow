const addIngredientType = 'ADD_INGREDIENT';
const removeIngredientType = 'REMOVE_INGREDIENT';

export { addIngredientType };
export function addIngredient({ id = new Date().getTime(), name, recipe }) {
    return {
        type: addIngredientType,
        id,
        name,
        recipe
    };
}

export { removeIngredientType };
export function removeIngredient(index) {
    return {
        type: removeIngredientType,
        index
    };
}
