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


    // OLD FOOD HOW

//     import React from 'react';
// import App from 'next/app';
// import { Provider } from 'react-redux';
// import Store from '../src/store';

// // These scss imports are in this location because there is a bug
// // where loading styles sometimes breaks routes.
// // https://github.com/zeit/next-plugins/issues/282
// import '../src/components/shoppingList/shoppingList.scss';
// import '../src/components/recipe/recipe.scss';
// import '../src/components/ingredientList/ingredientList.scss';


