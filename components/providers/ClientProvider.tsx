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

const queryClient = new QueryClient(queryClientOptions);

const ClientProvider = ({ children }: { children: ReactNode }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ClientProvider;
