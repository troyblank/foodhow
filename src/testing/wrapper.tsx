import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const TestWrapper = ({ children }: React.PropsWithChildren) => (
	<QueryClientProvider client={new QueryClient()}>
		{children}
	</QueryClientProvider>
);
