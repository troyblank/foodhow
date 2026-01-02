import { type GetServerSidePropsContext } from 'next';
import { type User } from '../types';
import { getUserFromAmplify, SIGN_IN_PATH } from '.';


export const getServerSidePropsWithoutAuthRedirect: (_context: GetServerSidePropsContext) => Promise<{ props: { user: User | null } } | null> = async (serverSideContext) => {
	let user: User | null = null;

	try {
		user = await getUserFromAmplify(serverSideContext);
	} finally {
		// Do nothing
	}

	return { props: { user } };
};

export const getServerSidePropsWithUnauthRedirect: (_context: GetServerSidePropsContext) => Promise<{ props: { user: User | null } } | null> = async (serverSideContext) => {
	let user: User | null = null;

	const respondWithUnauthenticated = (): null => {
		const { res: response } = serverSideContext;

		response.setHeader('location', SIGN_IN_PATH);
		response.statusCode = 302;
		response.end();

		return null;
	};

	try {
		user = await getUserFromAmplify(serverSideContext);
	} catch (error) {
		respondWithUnauthenticated();
	}

	return { props: { user } };
};
