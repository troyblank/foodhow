import React, { type FunctionComponent } from 'react';
import { type GetServerSidePropsContext } from 'next';
import { type User } from '../types';
import { AuthProvider } from '../contexts';
import { Head, Navigation, ShoppingList } from '../components';
import { getServerSidePropsWithUnauthRedirect } from '../utils';

export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsWithUnauthRedirect(serverSideContext);

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
