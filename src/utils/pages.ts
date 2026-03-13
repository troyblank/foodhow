import { type GetServerSidePropsContext } from 'next'
import { type User } from '../types'
import { getUserFromAmplify, SIGN_IN_PATH } from '.'
import { LAST_ROUTE_COOKIE_NAME, SHOPPING_LIST_PATH } from './router'

export const getRefererFromRequest = (
	req: GetServerSidePropsContext['req'] | undefined,
): string => {
	const refererRaw = req?.headers?.referer ?? req?.headers?.referrer ?? ''
	return typeof refererRaw === 'string' ? refererRaw : refererRaw[0] ?? ''
}

export const getOurHostnameFromRequest = (
	req: GetServerSidePropsContext['req'] | undefined,
): string => (req?.headers?.host?.split(':')[0] ?? '')

// If the request is a direct load of home and the user's last route was shopping list, return a redirect so we never render home.
export const getRedirectToShoppingListIfDirectLoad = (
	context: GetServerSidePropsContext,
): { redirect: { destination: string; permanent: false } } | null => {
	const cookieHeader = context.req?.headers?.cookie ?? ''
	const match = cookieHeader.match(new RegExp(`${LAST_ROUTE_COOKIE_NAME}=([^;]+)`))
	const lastRoute = match ? decodeURIComponent(match[1].trim()) : null
	if (lastRoute !== SHOPPING_LIST_PATH) return null

	const referer = getRefererFromRequest(context.req)
	if (!referer) return { redirect: { destination: SHOPPING_LIST_PATH, permanent: false } }
	try {
		const ourHostname = getOurHostnameFromRequest(context.req)
		const refererHostname = new URL(referer).hostname
		if (ourHostname && refererHostname === ourHostname) return null
	} catch {
		// Invalid referer URL
	}
	return { redirect: { destination: SHOPPING_LIST_PATH, permanent: false } }
}

export const getServerSidePropsWithoutAuthRedirect: (_context: GetServerSidePropsContext) => Promise<{ props: { user: User | null } } | null> = async (serverSideContext) => {
	let user: User | null

	try {
		user = await getUserFromAmplify(serverSideContext)
	} finally {
		// Do nothing
	}

	return { props: { user } }
}

export const getServerSidePropsWithUnauthRedirect: (_context: GetServerSidePropsContext) => Promise<{ props: { user: User | null } } | null> = async (serverSideContext) => {
	let user: User | null = null

	const respondWithUnauthenticated = (): null => {
		const { res: response } = serverSideContext

		response.setHeader('location', SIGN_IN_PATH)
		response.statusCode = 302
		response.end()

		return null
	}

	try {
		user = await getUserFromAmplify(serverSideContext)
	} catch (_) {
		respondWithUnauthenticated()
	}

	return { props: { user } }
}
