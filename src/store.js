import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const foodHowShoppingList = 'FOOD_HOW_SHOPPING_LIST';

const enhancers = compose(
    applyMiddleware(thunk)
);

const shoppingListLocalStore = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(foodHowShoppingList)) : [];
const defaultState = { shoppingList: { shoppingList: shoppingListLocalStore } };

const store = createStore(reducers, defaultState, enhancers);

store.subscribe(() => {
    const { shoppingList: shoppingListStore } = store.getState();
    const { shoppingList } = shoppingListStore;

    localStorage.setItem(foodHowShoppingList, JSON.stringify(shoppingList));
});

export default store;
