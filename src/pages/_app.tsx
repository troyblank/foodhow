import { QueryClientProvider } from '@tanstack/react-query';
import { type AppProps } from 'next/app';
import React from 'react';
import { queryClient } from '../data';

import '../styles/theme.css';
import '../sass/index.scss';

export const App = ({ Component, pageProps }: AppProps) => (
	<QueryClientProvider client={queryClient}>
		<Component {...pageProps} />
	</QueryClientProvider>
);

export default App;
