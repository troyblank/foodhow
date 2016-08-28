import { createStore, compose } from 'redux';
import reducer from './reducers/index';

const ingredientsStoreKey = 'food-how-ingredients';

const defaultState = {
    ingredients: JSON.parse(localStorage.getItem(ingredientsStoreKey)) || []
};

const enhancers = compose(
    /* istanbul ignore next */
    window.devToolsExtension ? window.devToolsExtension() : d => d
);

const store = createStore(reducer, defaultState, enhancers);
store.subscribe(() => {
    localStorage.setItem(ingredientsStoreKey, JSON.stringify(store.getState().ingredients));
});

export default store;
