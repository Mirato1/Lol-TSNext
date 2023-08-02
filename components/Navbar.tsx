'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCycle, motion, AnimatePresence, SVGMotionProps } from 'framer-motion';
import { headerLinks } from '@/constants';
import { Ref, useEffect, useState } from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const itemVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

const sideVariants = {
	open: {
		transition: {
			staggerChildren: 0.05,
			staggerDirection: 1,
		},
	},
};

const Navbar = () => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const path = usePathname();

	return (
		<>
			<header className='fixed z-10 w-full'>
				<motion.nav
					initial={false}
					animate={isOpen ? 'open' : 'closed'}
					custom='100%'
					className='flex justify-between border-b border-slate-900/10 p-2 py-3 backdrop-blur dark:border-slate-300/10  md:justify-around'
				>
					<h1 className='text-2xl font-semibold text-red-500 dark:text-cyan-400'>Mirato</h1>
					<ul className='flex items-center'>
						{headerLinks.map((link) => (
							<li
								key={link.url}
								className={`hidden px-4 py-0 text-center text-sm  font-bold 
                transition-colors duration-500 hover:text-red-500 dark:hover:text-cyan-300 md:list-item ${
									path === link.url ? 'link-active' : ''
								}`}
							>
								<Link href={link.url}>{link.title}</Link>
							</li>
						))}
						<Button />
						<Hamburguer toggle={() => toggleOpen()} />
					</ul>
				</motion.nav>
			</header>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.aside
							initial={{ width: 0, opacity: 0 }}
							animate={{
								width: '50%',
								opacity: 1,
							}}
							exit={{
								width: 0,
								transition: { delay: 0, duration: 0.45 },
							}}
							className='fixed right-0 top-0 z-[999] flex h-screen flex-col justify-center  border-r border-r-gray-400 bg-gradient-to-br from-zinc-50 to-zinc-300 shadow-lg dark:border-r-gray-800 dark:bg-gradient-to-br dark:from-neutral-800 dark:to-zinc-900 md:hidden '
						>
							<motion.div initial='closed' animate='open' exit='closed' variants={sideVariants}>
								<motion.ul
									className='flex flex-col items-center gap-3 '
									initial='closed'
									animate='open'
									exit='closed'
									variants={sideVariants}
								>
									{headerLinks.map((link) => (
										<motion.li
											key={link.url}
											whileHover={{ scale: 1.1 }}
											variants={itemVariants}
											className={`list-item p-0 text-center text-3xl font-bold text-red-500 transition-colors duration-500 hover:text-gray-700 dark:hover:text-gray-50 ${
												path === link.url ? 'active' : ''
											}`}
										>
											<Link className='whitespace-nowrap' onClick={() => toggleOpen()} href={link.url}>
												{link.title}
											</Link>
										</motion.li>
									))}
								</motion.ul>
							</motion.div>
						</motion.aside>
						<div
							className=' fixed top-0 z-20 h-screen w-screen bg-gray-300 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-70 md:hidden '
							onClick={() => toggleOpen()}
						/>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

const Button = () => {
	const [darkMode, setDarkMode] = useState<string | null>(() => {
		const savedMode = localStorage.getItem('darkMode');
		if (savedMode) {
			return savedMode === 'dark' || savedMode === 'light' ? savedMode : 'light';
		}
		return null;
	});

	const toggleDarkMode = () => {
		const newMode = darkMode === 'light' ? 'dark' : 'light';
		setDarkMode(newMode);
		localStorage.setItem('darkMode', newMode);
	};

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode === 'dark');
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

const Path = (
	props: React.SVGProps<SVGPathElement> & SVGMotionProps<SVGPathElement> & { ref?: Ref<SVGPathElement> | null },
) => (
	<motion.path
		fill='transparent'
		strokeWidth='3'
		className='stroke-zinc-900 dark:stroke-slate-100'
		strokeLinecap='round'
		{...props}
	/>
);

interface HamburguerProps {
	toggle: () => void; // Cambiar el tipo de toggle a una función que no recibe parámetros y no retorna nada
}

const Hamburguer = ({ toggle }: HamburguerProps) => {
	return (
		<button onClick={toggle} className='px-4 py-0 md:hidden'>
			<svg width='23' height='23' viewBox='0 0 23 23'>
				<Path
					variants={{
						closed: { d: 'M 2 2.5 L 20 2.5' },
						open: { d: 'M 3 16.5 L 17 2.5' },
					}}
				/>
				<Path
					d='M 2 9.423 L 20 9.423'
					variants={{
						closed: { opacity: 1 },
						open: { opacity: 0 },
					}}
					transition={{ duration: 0.1 }}
				/>
				<Path
					variants={{
						closed: { d: 'M 2 16.346 L 20 16.346' },
						open: { d: 'M 3 2.5 L 17 16.346' },
					}}
				/>
			</svg>
		</button>
	);
};

export default Navbar;
