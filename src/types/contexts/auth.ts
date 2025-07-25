import { type SignInInput } from 'aws-amplify/auth';
import { USERS } from '../../../config';

export type User = {
    fullName: string,
    jwtToken: string,
    username: typeof USERS[number]
}

export type UserAttributes = {
	family_name: string,
	given_name: string,
}

export type SignInOutput = {
	isUserComplete: boolean
}

export type AttemptToSignIn = ({ username, password }: SignInInput) => Promise<SignInOutput>

export type AuthContextType = {
	attemptToSignIn: AttemptToSignIn,
	user: User | null,
}
