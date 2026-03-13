import Chance from 'chance'
import { type GetServerSidePropsContext } from 'next'
import { mockUser } from '../testing/mocks'
import { User } from '../types'
import { getUserFromAmplify, SIGN_IN_PATH } from '.'
import {
	getOurHostnameFromRequest,
	getRedirectToShoppingListIfDirectLoad,
	getRefererFromRequest,
	getServerSidePropsWithoutAuthRedirect,
	getServerSidePropsWithUnauthRedirect,
} from './pages'
import { SHOPPING_LIST_PATH } from './router'

jest.mock('./')

const emptyContext = (overrides: Partial<GetServerSidePropsContext> = {}) =>
	({ req: { headers: {} }, res: {}, ...overrides } as GetServerSidePropsContext)

describe('Get referer from request.', () => {
	it('Returns empty string when the request is undefined.', () => {
		expect(getRefererFromRequest(undefined)).toBe('')
	})

	it('Returns empty string when the request has no headers.', () => {
		expect(getRefererFromRequest({} as any)).toBe('')
	})

	it('Returns empty string when headers have no referer or referrer.', () => {
		expect(getRefererFromRequest({ headers: {} } as any)).toBe('')
	})

	it('Returns the referer header when present.', () => {
		expect(
			getRefererFromRequest({
				headers: { referer: 'https://example.com/page' },
			} as any),
		).toBe('https://example.com/page')
	})

	it('Returns the referrer header when referer is missing.', () => {
		expect(
			getRefererFromRequest({
				headers: { referrer: 'https://example.com/other' },
			} as any),
		).toBe('https://example.com/other')
	})

	it('Uses the first element when referer header is an array.', () => {
		expect(
			getRefererFromRequest({
				headers: { referer: ['https://example.com/'] as any },
			} as any),
		).toBe('https://example.com/')
	})

	it('Returns empty string when referer header is an array with no first element.', () => {
		expect(
			getRefererFromRequest({
				headers: { referer: [] as any },
			} as any),
		).toBe('')
	})
})

describe('Get our hostname from request.', () => {
	it('Returns empty string when the request is undefined.', () => {
		expect(getOurHostnameFromRequest(undefined)).toBe('')
	})

	it('Returns empty string when the request has no headers.', () => {
		expect(getOurHostnameFromRequest({} as any)).toBe('')
	})

	it('Returns empty string when headers have no host.', () => {
		expect(getOurHostnameFromRequest({ headers: {} } as any)).toBe('')
	})

	it('Returns the host when present without a port.', () => {
		expect(
			getOurHostnameFromRequest({ headers: { host: 'example.com' } } as any),
		).toBe('example.com')
	})

	it('Returns the hostname without port when host includes a port.', () => {
		expect(
			getOurHostnameFromRequest({
				headers: { host: 'example.com:3000' },
			} as any),
		).toBe('example.com')
	})
})

describe('Redirect to shopping list when the request is a direct load.', () => {
	it('Returns null when the last-route cookie is missing.', () => {
		expect(getRedirectToShoppingListIfDirectLoad(emptyContext())).toBeNull()
	})

	it('Returns null when the request has no headers.', () => {
		expect(
			getRedirectToShoppingListIfDirectLoad(
				emptyContext({ req: {} as any }),
			),
		).toBeNull()
	})

	it('Returns null when the request is undefined.', () => {
		expect(
			getRedirectToShoppingListIfDirectLoad(
				emptyContext({ req: undefined as any }),
			),
		).toBeNull()
	})

	it('Returns null when the last-route cookie is not the shopping list path.', () => {
		expect(
			getRedirectToShoppingListIfDirectLoad(
				emptyContext({
					req: { headers: { cookie: 'foodhow_last_route=%2Frecipe%2Ffoo' } } as any,
				}),
			),
		).toBeNull()
	})

	it('Returns redirect when the last route was shopping list and there is no referer.', () => {
		const result = getRedirectToShoppingListIfDirectLoad(
			emptyContext({
				req: {
					headers: {
						cookie: 'foodhow_last_route=%2FshoppingList',
						referer: undefined,
					},
				} as any,
			}),
		)
		expect(result).toEqual({
			redirect: { destination: SHOPPING_LIST_PATH, permanent: false },
		})
	})

	it('Returns null when the last route was shopping list and referer is same origin.', () => {
		const result = getRedirectToShoppingListIfDirectLoad(
			emptyContext({
				req: {
					headers: {
						cookie: 'foodhow_last_route=%2FshoppingList',
						referer: 'https://example.com/shoppingList',
						host: 'example.com',
					},
				} as any,
			}),
		)
		expect(result).toBeNull()
	})

	it('Returns redirect when the last route was shopping list and referer is a different origin.', () => {
		const result = getRedirectToShoppingListIfDirectLoad(
			emptyContext({
				req: {
					headers: {
						cookie: 'foodhow_last_route=%2FshoppingList',
						referer: 'https://other-site.com/',
						host: 'example.com',
					},
				} as any,
			}),
		)
		expect(result).toEqual({
			redirect: { destination: SHOPPING_LIST_PATH, permanent: false },
		})
	})

	it('Returns redirect when the last route was shopping list and referer is an invalid URL.', () => {
		const result = getRedirectToShoppingListIfDirectLoad(
			emptyContext({
				req: {
					headers: {
						cookie: 'foodhow_last_route=%2FshoppingList',
						referer: 'not-a-valid-url',
						host: 'example.com',
					},
				} as any,
			}),
		)
		expect(result).toEqual({
			redirect: { destination: SHOPPING_LIST_PATH, permanent: false },
		})
	})

	it('Returns null when same-origin referer uses host with port.', () => {
		const result = getRedirectToShoppingListIfDirectLoad(
			emptyContext({
				req: {
					headers: {
						cookie: 'foodhow_last_route=%2FshoppingList',
						referer: 'https://example.com:3000/',
						host: 'example.com:3000',
					},
				} as any,
			}),
		)
		expect(result).toBeNull()
	})

	it('Uses first element when referer header is an array.', () => {
		const result = getRedirectToShoppingListIfDirectLoad(
			emptyContext({
				req: {
					headers: {
						cookie: 'foodhow_last_route=%2FshoppingList',
						referer: ['https://example.com/'] as any,
						host: 'example.com',
					},
				} as any,
			}),
		)
		expect(result).toBeNull()
	})
})

describe('Server-side props with and without auth redirect.', () => {
	const chance = new Chance()

	it('should be able to get server side props', async () => {
		const setHeader = jest.fn()
		const expectedUser: User = mockUser()

		jest.mocked(getUserFromAmplify).mockResolvedValue(expectedUser)

		expect(await getServerSidePropsWithUnauthRedirect({ res: {
			setHeader,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user: expectedUser },
		})
		expect(setHeader).not.toHaveBeenCalled()
	})

	it('should not get get server side props if getting the session fails', async () => {
		const setHeader = jest.fn()

		jest.spyOn(console, 'error').mockImplementation(() => {})
		jest.mocked(getUserFromAmplify).mockRejectedValue(new Error(chance.paragraph()))

		expect(await getServerSidePropsWithUnauthRedirect({ res: {
			setHeader,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user: null },
		})
		expect(setHeader).toHaveBeenCalledWith('location', SIGN_IN_PATH)
	})

	it('should be able to get server side props without redirecting', async () => {
		const setHeader = jest.fn()
		const expectedUser: User = mockUser()

		jest.mocked(getUserFromAmplify).mockResolvedValue(expectedUser)

		expect(await getServerSidePropsWithoutAuthRedirect({ res: {
			setHeader,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user: expectedUser },
		})
		expect(setHeader).not.toHaveBeenCalled()
	})

	it('should be able to get server side props without redirecting and there is no user', async () => {
		const setHeader = jest.fn()

		jest.spyOn(console, 'error').mockImplementation(() => {})
		jest.mocked(getUserFromAmplify).mockResolvedValue(null)

		expect(await getServerSidePropsWithoutAuthRedirect({ res: {
			setHeader,
			end: jest.fn(),
		} } as any)).toStrictEqual({
			props: { user: null },
		})
	})
})
