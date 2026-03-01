import { QueryClient } from '@tanstack/react-query'

const TEN_MINUTES: number = 600000

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: TEN_MINUTES,
		},
	},
})
