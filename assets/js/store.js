import { createStore } from 'redux';
import reducer from './reducers/index';

const ingredientsStoreKey = 'food-how-ingredients';

const defaultState = {
    ingredients: JSON.parse(localStorage.getItem(ingredientsStoreKey)) || []
};

const store = createStore(reducer, defaultState);
store.subscribe(() => {
    localStorage.setItem(ingredientsStoreKey, JSON.stringify(store.getState().ingredients));
});

export default store;
