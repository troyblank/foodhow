import { connect } from 'react-redux';
import RecipeComponent from './recipe/recipe';

export function mapStateToProps(state) {
    return {
        recipe: state.recipe
    };
}

export Guide from './guide/guide';
export Head from './head/head';
export Navigation from './navigation/navigation';
export RecipeList from './recipeList/recipeList';

export const Recipe = connect(mapStateToProps)(RecipeComponent);
