const addIngredientType = 'ADD_INGREDIENT';
const checkIngredientType = 'CHECK_INGREDIENT';
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

export { checkIngredientType };
export function checkIngredient(index) {
    return {
        type: checkIngredientType,
        index
    };
}

export { removeIngredientType };
export function removeIngredient(index) {
    return {
        type: removeIngredientType,
        index
    };
}
