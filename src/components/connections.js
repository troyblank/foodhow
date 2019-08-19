import { connect } from 'react-redux';
import RecipeComponent from './recipe/recipe';

export function mapStateToProps(state) {
    return {
        shoppingList: state.shoppingList
    };
}

export const Recipe = connect(mapStateToProps)(RecipeComponent);
