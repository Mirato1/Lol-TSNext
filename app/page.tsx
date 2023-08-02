'use client';
import { motion } from 'framer-motion';

const Home = () => {
	return (
		<section className='bg-[url(https://mirato1.github.io/Lol-Page/assets/Aatrox_wall.jpg)] bg-cover bg-center bg-no-repeat '>
			<aside className='flex min-h-screen w-full items-center justify-center bg-black bg-opacity-40 text-center '>
				<AnimatedTitle />
			</aside>
		</section>
	);
};

const AnimatedTitle = () => {
	const headline = {
		hidden: { opacity: 0, y: -25 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.15,
				type: 'spring',
				damping: 100,
				mass: 4,
			},
		},
	};

	return (
		<motion.section initial='hidden' animate='visible'>
			<motion.h2 variants={headline} className='m-0 text-[5rem] font-semibold leading-snug text-white'>
				Soy
				<motion.span className='font-semibold text-red-500'> Mirato</motion.span>
				<br />
				y te enseño
				<br />a jugar <motion.b className='font-semibold text-red-500'>Top</motion.b>
			</motion.h2>
		</motion.section>
	);
};

export default Home;
