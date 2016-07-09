const addIngredientType = 'ADD_INGREDIENT';

export { addIngredientType };
export function addIngredient(name, recipe) {
    return {
        type: addIngredientType,
        name,
        recipe
    };
}
