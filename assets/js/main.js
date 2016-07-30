import './legacy';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { App } from './components/app';

export default function Main() {
    return <App store={store} />;
}

ReactDOM.render(<Main />, document.querySelector('#shopping-list-react'));
