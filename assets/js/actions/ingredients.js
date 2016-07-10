const addIngredientType = 'ADD_INGREDIENT';
const removeIngredientType = 'REMOVE_INGREDIENT';

export { addIngredientType };
export function addIngredient(name, recipe) {
    return {
        type: addIngredientType,
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
