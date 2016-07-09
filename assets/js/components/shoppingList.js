import React from 'react';

import {
    NoResultMessage }
    from '@troyblank/food-how-components/lib/index';

export default function ShoppingList() {
    return (
      <section>
        <NoResultMessage headline={'This list is empty'} message={'There is no ingredients on your list, add some to make a shopping list.'} />
      </section>
    );
}
