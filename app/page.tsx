'use client';
import { motion, useAnimation } from 'framer-motion';

const Home = () => {
	return (
		<section className='bg-img'>
			<aside className='flex min-h-screen w-full items-center justify-center bg-black bg-opacity-40 text-center '>
				<AnimatedTitle />
			</aside>
		</section>
	);
};

const AnimatedTitle = () => {
	const titleControls = useAnimation();

	const titleVariants = {
		hidden: { opacity: 0, y: -50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 5, // Reduce this value for slower animation
				stiffness: 50, // Reduce this value for slower animation
				mass: 0.8,
			},
		},
	};

	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 8, // Reduce this value for slower animation
				stiffness: 40, // Reduce this value for slower animation
				mass: 0.6,
				delay: 0.3,
			},
		},
	};

	const startAnimation = async () => {
		await titleControls.start('visible');
	};

	return (
		<motion.section initial='hidden' animate='visible' onAnimationStart={startAnimation}>
			<motion.h2
				variants={titleVariants}
				initial='hidden'
				animate={titleControls}
				className='m-0 text-[4rem] font-semibold leading-snug text-white md:text-[5rem]'
			>
				Soy{' '}
				<motion.span variants={textVariants} className='font-semibold text-red-500 dark:text-cyan-400'>
					Mirato
				</motion.span>
				<br />
				y te enseño
				<br />a jugar{' '}
				<motion.span variants={textVariants} className='font-semibold text-red-500 dark:text-cyan-400'>
					TOP
				</motion.span>
			</motion.h2>
		</motion.section>
	);
};

export async function getStaticProps() {
	return {
		props: {}, // You can optionally pass props here
	};
}

export default Home;
