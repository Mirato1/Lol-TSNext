'use client';
import { useEffect, useState } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const ButtonTheme = () => {
	const [darkMode, setDarkMode] = useState<string | null>(null);

	const toggleDarkMode = () => {
		const newMode = darkMode === 'light' ? 'dark' : 'light';
		setDarkMode(newMode);
		localStorage.setItem('darkMode', newMode);
	};

	useEffect(() => {
		if (darkMode === null) {
			setDarkMode(localStorage.getItem('darkMode'));
		} else {
			darkMode === 'light'
				? document.documentElement.classList.remove('dark')
				: document.documentElement.classList.add('dark');
		}
	}, [darkMode]);

	return (
		<button onClick={toggleDarkMode} className='px-4 py-0'>
			{darkMode === 'dark' ? (
				<BsFillSunFill className='cursor-pointer fill-red-400 text-lg transition-all duration-500 hover:fill-red-500' />
			) : (
				<BsFillMoonStarsFill className='cursor-pointer fill-cyan-600 text-lg transition-all duration-500 hover:fill-cyan-400' />
			)}
		</button>
	);
};

export default ButtonTheme;
