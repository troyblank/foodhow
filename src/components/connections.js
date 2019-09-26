import { connect } from 'react-redux';
import RecipeComponent from './recipe/recipe';
import ShoppingListComponent from './shoppingList/shoppingList';

export function mapStateToProps(state) {
    return {
        shoppingList: state.shoppingList
    };
}

export const Recipe = connect(mapStateToProps)(RecipeComponent);
export const ShoppingList = connect(mapStateToProps)(ShoppingListComponent);
