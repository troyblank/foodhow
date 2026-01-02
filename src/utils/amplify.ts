import { type GetServerSidePropsContext } from 'next';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { AmplifyServer } from 'aws-amplify/adapter-core';
import { type FetchUserAttributesOutput, type GetCurrentUserOutput } from '@aws-amplify/auth';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import {
	fetchAuthSession,
	fetchUserAttributes,
	getCurrentUser
} from 'aws-amplify/auth/server';
import { amplifyConfig } from '../../config';
import { type User } from '../types';

Amplify.configure(amplifyConfig as ResourcesConfig, { ssr: true });

type JWT = {
    toString: () => string;
}

type AuthTokens = {
    idToken?: JWT;
    accessToken: JWT;
}

type AuthSession = {
    tokens?: AuthTokens;
    identityId?: string;
    userSub?: string;
}

export const extractUserInformationFromAmplifyServerContext = async (amplifyContextSpecification: AmplifyServer.ContextSpec): Promise<User> => {
	try {
		const { username }: GetCurrentUserOutput = await getCurrentUser(amplifyContextSpecification);
		const { tokens }: AuthSession = await fetchAuthSession(amplifyContextSpecification);
		const attributes: FetchUserAttributesOutput = await fetchUserAttributes(amplifyContextSpecification);
		const jwtToken: string = String(tokens.idToken.toString());

		return {
			fullName: `${attributes.given_name} ${attributes.family_name}`,
			jwtToken,
			username
		};
	} catch (error) {
		// User is not authenticated
		return null;
	}
};

export const { runWithAmplifyServerContext } = createServerRunner({
	config: amplifyConfig
});

export const getUserFromAmplify = async (serverSideContext: GetServerSidePropsContext): Promise<User | null> => {
	const { req: request, res: response } = serverSideContext;
	let user: User | null = null;

	await runWithAmplifyServerContext({
		nextServerContext: { request, response },
		operation: /* istanbul ignore next */ async (amplifyContextSpecification: AmplifyServer.ContextSpec) => {
			user = await extractUserInformationFromAmplifyServerContext(amplifyContextSpecification);
		}
	});

	return user;
};
