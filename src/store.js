import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { foodHowShoppingList } from './components/shoppingList/reducer';
import reducers from './reducers';

const enhancers = compose(
    applyMiddleware(thunk)
);

const store = createStore(reducers, enhancers);

store.subscribe(() => {
    const { shoppingList: shoppingListStore } = store.getState();
    const { shoppingList } = shoppingListStore;

    localStorage.setItem(foodHowShoppingList, JSON.stringify(shoppingList));
});

export default store;
