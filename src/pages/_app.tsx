import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux';
// import { QueryClientProvider } from '@tanstack/react-query'
// import { queryClient } from '../data'

import Store from '../store';
import '../sass/index.scss'

export const App = ({ Component, pageProps }: AppProps) => (
    <Provider store={Store}>
        <Component {...pageProps} />
    </Provider>
)

export default App
	// <QueryClientProvider client={queryClient}>
	// </QueryClientProvider>
