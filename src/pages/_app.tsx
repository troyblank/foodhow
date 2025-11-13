import { QueryClientProvider } from '@tanstack/react-query';
import { type AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { queryClient } from '../data';

import Store from '../store';
import '../styles/theme.css';
import '../sass/index.scss';

export const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>
  </QueryClientProvider>
);

export default App;
