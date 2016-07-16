import './legacy';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import ShoppingList from './components/shoppingList';

export default function Main() {
    return (
      <div>
        <ShoppingList store={store} />
      </div>
    );
}

ReactDOM.render(<Main />, document.querySelector('#shopping-list-react'));
