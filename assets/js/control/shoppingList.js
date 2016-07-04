import React from 'react';
import ReactDOM from 'react-dom';

import {
    NoResultMessage }
    from '@troyblank/food-how-components/components/index';

ReactDOM.render(
  <section>
    <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />
  </section>,
    document.querySelector('#shopping-list-react'));
