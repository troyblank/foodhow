import { QueryClientProvider } from '@tanstack/react-query'
import { type AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { queryClient } from '../data'
import {
	LAST_ROUTE_COOKIE_MAX_AGE_SECONDS,
	LAST_ROUTE_COOKIE_NAME,
} from '../utils/router'

import '../styles/theme.css'
import '../sass/index.scss'

const usePersistLastRoute = (): void => {
	const router = useRouter()

	useEffect(() => {
		if (!router.isReady || !router.pathname) return
		try {
			document.cookie = `${LAST_ROUTE_COOKIE_NAME}=${encodeURIComponent(router.pathname)}; path=/; max-age=${LAST_ROUTE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
		} catch {
			// Cookie may be unavailable
		}
	}, [router.isReady, router.pathname])
}

export const App = ({ Component, pageProps }: AppProps) => {
	usePersistLastRoute()
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	)
}

export default App
