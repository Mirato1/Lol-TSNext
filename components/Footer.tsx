'use client';
import { usePathname } from 'next/navigation';
import { FaTwitch } from 'react-icons/fa';

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();
	const path = usePathname();

	return (
		<footer
			className={`flex justify-center py-2 gap-2 w-full mx-auto items-center ${
				path === '/' ? 'fixed bottom-0 z-10' : 'static'
			}`}
		>
			<a
				className='text-red-600 dark:text-cyan-400 font-bold'
				href='https://clips.twitch.tv/SmokyPoisedGooseDxAbomb-lZ99mx0sGMLWptYq?ab_channel=mantarraya'
				rel='noreferrer'
				target='_blank'
			>
				Mirato
			</a>
			{year}&copy;
			<a href='https://twitch.tv/mirato123' rel='noreferrer' target='_blank'>
				<i className='text-purple-500'>
					<FaTwitch />
				</i>
			</a>
		</footer>
	);
};

export default Footer;
