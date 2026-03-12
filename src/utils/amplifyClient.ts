import { fetchAuthSession } from 'aws-amplify/auth'

// Automatically refreshes the token if expired and a refresh token is available.
// Use this at API call time so requests use a fresh token after the app has been in the background.
export const getClientJwt = async (): Promise<string | null> => {
	try {
		const { tokens } = await fetchAuthSession()
		const idToken = tokens?.idToken
		return idToken != null ? String(idToken.toString()) : null
	} catch {
		return null
	}
}
