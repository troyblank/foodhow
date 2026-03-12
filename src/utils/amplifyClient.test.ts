import { fetchAuthSession } from 'aws-amplify/auth'
import { getClientJwt } from './amplifyClient'

jest.mock('aws-amplify/auth')

describe('getClientJwt', () => {
	it('Returns the current session token when the user is signed in.', async () => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test'
		jest.mocked(fetchAuthSession).mockResolvedValue({
			tokens: { idToken: { toString: () => token } },
		} as any)

		expect(await getClientJwt()).toBe(token)
	})

	it('Returns nothing when the session has no token.', async () => {
		jest.mocked(fetchAuthSession).mockResolvedValue({ tokens: {} } as any)

		expect(await getClientJwt()).toBeNull()
	})

	it('Returns nothing when the session cannot be read.', async () => {
		jest.mocked(fetchAuthSession).mockRejectedValue(new Error('Not signed in'))

		expect(await getClientJwt()).toBeNull()
	})
})
