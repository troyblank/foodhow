import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import ShoppingList from './shoppingList';

function mapStateToProps(state) {
    return {
        ingredients: state.ingredients
    };
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(ShoppingList);
export { App, mapStateToProps, mapDispachToProps };
