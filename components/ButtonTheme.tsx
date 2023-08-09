'use client';
import { useEffect, useState } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

const ButtonTheme = () => {
	const [mounted, setMounted] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);
	if (!mounted) {
		const currentTheme = theme === 'system' ? systemTheme : theme;
		console.log('🚀 ~ ButtonTheme ~ currentTheme:', currentTheme);
		return (
			<li className='px-4 py-0'>
				<BsFillMoonStarsFill className='cursor-pointer fill-cyan-600 text-lg transition-all duration-500 hover:fill-cyan-400' />
			</li>
		);
	}

	const currentTheme = theme === 'system' ? systemTheme : theme;

	const toggleDarkMode = () => {
		setTheme(currentTheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<li onClick={toggleDarkMode} className='px-4 py-0'>
			{currentTheme === 'dark' ? (
				<BsFillSunFill className='cursor-pointer fill-red-400 text-lg transition-all duration-500 hover:fill-red-500' />
			) : (
				<BsFillMoonStarsFill className='cursor-pointer fill-cyan-600 text-lg transition-all duration-500 hover:fill-cyan-400' />
			)}
		</li>
	);
};

export default ButtonTheme;
