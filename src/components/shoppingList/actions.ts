export const TOGGLE_INGREDIENT_CHECK_MARK = 'TOGGLE_INGREDIENT_CHECK_MARK';
export const CLEAR_CHECKED_INGREDIENTS = 'CLEAR_CHECKED_INGREDIENTS';

export const toggleIngredientCheckMark = (ingredientID) => ({ type: TOGGLE_INGREDIENT_CHECK_MARK, ingredientID });
export const clearCheckedIngredients = () => ({ type: CLEAR_CHECKED_INGREDIENTS });
