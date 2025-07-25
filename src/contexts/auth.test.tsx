import { act, renderHook } from '@testing-library/react'
import { signIn } from 'aws-amplify/auth'
import Chance from 'chance'
import { AuthProvider, useAuth } from './auth'

jest.mock('aws-amplify/auth')

describe('Use Auth', () => {
	const chance = new Chance()

	beforeEach(() => {
		jest.mocked(signIn).mockResolvedValue({
			isSignedIn: chance.bool(),
			nextStep: { signInStep: 'DONE' },
		} as any)
	})

	it('should allow attempts to sign in', async () => {
		const username: string = chance.first()
		const password: string = chance.word()

		jest.mocked(signIn).mockResolvedValue({
			isSignedIn: true,
			nextStep: { signInStep: 'DONE' },
		} as any)

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToSignIn } = result.current

		await act(async() => await attemptToSignIn({ username, password }))

		expect(signIn).toHaveBeenCalledWith({ username, password })
	})

	it('should handle any errors with attempts to sign in', async () => {
		const username: string = chance.name()
		const password: string = chance.word()

		const error: string = chance.paragraph()
		jest.mocked(signIn).mockRejectedValue(error)
		jest.spyOn(window, 'alert')

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToSignIn } = result.current

		expect(async() => await attemptToSignIn({ username, password })).rejects.toThrow(error)
	})

	it('should handle any errors with any nextStep not accounted for', async () => {
		const badNextStep: string = chance.word({ length: 20 }) // should not be 'DONE'
		const username: string = chance.name()
		const password: string = chance.word()

		jest.mocked(signIn).mockResolvedValue({
			isSignedIn: false,
			nextStep: { signInStep: badNextStep },
		} as any)
		jest.spyOn(window, 'alert')

		const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider as any })

		const { attemptToSignIn } = result.current

		expect(async() => await attemptToSignIn({ username, password })).rejects.toThrow(`UI flow is missing a step: ${badNextStep}. This is not your fault; please contact support.`)
	})
})
