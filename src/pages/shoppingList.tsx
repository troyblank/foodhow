import React, { type FunctionComponent } from 'react';
import { type GetServerSidePropsContext } from 'next';
import { type User } from '../types';
import { AuthProvider } from '../contexts';
import { Head, Navigation, ShoppingList } from '../components';
import { getServerSidePropsOrRedirect } from '../utils';

export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsOrRedirect(serverSideContext);

export const ShoppingListPage: FunctionComponent = ({ user }: { user: User }) => (
  <AuthProvider user={user}>
    <React.Fragment>
      <Head />
      <Navigation />
      <ShoppingList />
    </React.Fragment>
  </AuthProvider>
);

export default ShoppingListPage;
