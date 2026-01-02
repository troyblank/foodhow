import React, { Fragment, type FunctionComponent } from 'react';
import { type GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { type User } from '../../types';
import { AuthProvider } from '../../contexts';
import { getServerSidePropsWithoutAuthRedirect } from '../../utils';
import { Head, Navigation, Recipe } from '../../components';

export const getServerSideProps = async (serverSideContext: GetServerSidePropsContext) => getServerSidePropsWithoutAuthRedirect(serverSideContext);

export const RecipePage: FunctionComponent = ({ user }: { user: User }) => {
	const router = useRouter();
	const { recipe } = router.query;

	if (!recipe) return null;

	return (
		<AuthProvider user={user}>
			<Fragment>
				<Head />
				<Navigation />
				<Recipe fileName={recipe as string} />
			</Fragment>
		</AuthProvider>
	);
};

export default RecipePage;
