import React, { type FunctionComponent } from 'react';
import { Head, Navigation, ShoppingList } from '../components';

export const ShoppingListPage: FunctionComponent = () => {
    return (
      <>
        <Head />
        <Navigation />
        <ShoppingList />
      </>
    );
}

export default ShoppingListPage;
