'use client';
import { useEffect, useState } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

const ButtonTheme: React.FC = () => {
	const [mounted, setMounted] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<li className='px-4 py-0'>
				<BsFillMoonStarsFill className='text-lg dark:text-red-400 text-cyan-600' />
			</li>
		);
	}

	const currentTheme = theme === 'system' ? systemTheme : theme;

	const iconStyle = 'cursor-pointer text-lg transition-all duration-500';

	const toggleDarkMode = () => {
		setTheme(currentTheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<li onClick={toggleDarkMode} className='px-4 py-0'>
			{currentTheme === 'dark' ? (
				<BsFillSunFill className={`${iconStyle} text-red-400 hover:text-red-500`} />
			) : (
				<BsFillMoonStarsFill className={`${iconStyle} text-cyan-600 hover:text-cyan-400`} />
			)}
		</li>
	);
};

export default ButtonTheme;
