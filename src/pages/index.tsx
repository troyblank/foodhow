// @ts-nocheck // remove when removing reducers
import React, { Fragment, type FunctionComponent } from 'react';
import { type GetServerSidePropsContext } from 'next';
import { type User } from '../types';
import { AuthProvider } from '../contexts';
import { recipes } from '../../static/recipes.json';
import { Head, Navigation, RecipeList } from '../components';
import { getServerSidePropsOrRedirect } from '../utils';

export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsOrRedirect(serverSideContext);

export const HomePage: FunctionComponent = ({ user }: { user: User }) => (
  <AuthProvider user={user}>
    <Fragment>
      <Head />
      <Navigation />
      <RecipeList recipes={recipes} />
    </Fragment>
  </AuthProvider>
);

export default HomePage;
