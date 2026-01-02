import React, { Fragment, type FunctionComponent } from 'react';
import { type GetServerSidePropsContext } from 'next';
import { type User } from '../types';
import { AuthProvider } from '../contexts';
import { getServerSidePropsWithoutAuthRedirect } from '../utils';
import { Head, Navigation, Guide } from '../components';

export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsWithoutAuthRedirect(serverSideContext);

export const GuidePage: FunctionComponent = ({ user }: { user: User }) => (
	<AuthProvider user={user}>
		<Fragment>
			<Head />
			<Navigation />
			<Guide />
		</Fragment>
	</AuthProvider>
);

export default GuidePage;
