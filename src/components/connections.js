import { connect } from 'react-redux';
import RecipeComponent from './recipe/recipe';
import ShoppingListComponent from './shoppingList/shoppingList';

const mapStateToProps = (state) => ({ ...state });

export const Recipe = connect(mapStateToProps)(RecipeComponent);
export const ShoppingList = connect(mapStateToProps)(ShoppingListComponent);
