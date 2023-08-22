'use client';
import { ThemeProvider } from 'next-themes';

export default function ThemeProviders({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider enableSystem attribute='class'>
			<div className='relative bg-zinc-200 text-zinc-900 dark:bg-slate-900 dark:text-zinc-100'>{children}</div>
		</ThemeProvider>
	);
}
