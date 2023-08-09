'use client';
import { ThemeProvider } from 'next-themes';

export default function ThemeProviders({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider enableSystem attribute='class'>
			<div className='relative bg-zinc-100 text-slate-500 dark:bg-slate-900 dark:text-slate-300'>{children}</div>
		</ThemeProvider>
	);
}
