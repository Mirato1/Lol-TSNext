'use client';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

const ButtonTheme: React.FC = () => {
	const { setTheme } = useTheme();

	const iconStyle = 'cursor-pointer text-lg transition-all duration-500';

	return (
		<li className='px-4 py-0'>
			<BsFillSunFill
				className={`${iconStyle} text-red-400 hover:text-red-500  hidden transition-all  dark:block`}
				onClick={() => setTheme('light')}
			/>
			<BsFillMoonStarsFill
				className={`${iconStyle} text-cyan-600 hover:text-cyan-400 block transition-all  dark:hidden`}
				onClick={() => setTheme('dark')}
			/>
		</li>
	);
};

export default ButtonTheme;
