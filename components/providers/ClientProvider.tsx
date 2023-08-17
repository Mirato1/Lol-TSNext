'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const queryClientOptions = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
};

const ClientProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient(queryClientOptions);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ClientProvider;
