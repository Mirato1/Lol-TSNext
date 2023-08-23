import { History, Ranked, User } from '@/components';
import { Suspense } from 'react';

const Profile = () => {
	return (
		<main className='container'>
			<article className='relative mt-4 profile__container px-2 sm:px-3'>
				<Suspense fallback={<LoaderUser />}>
					<User />
				</Suspense>
				<div className='flex flex-col md:flex-row w-full gap-4 z-[1]'>
					<Suspense fallback={<LoaderRanked />}>
						<Ranked />
					</Suspense>
					<Suspense fallback={<LoaderHistory />}>
						<History />
					</Suspense>
				</div>
			</article>
		</main>
	);
};

const LoaderHistory = () => {
	const numbersArray = Array.from({ length: 10 }, (_, index) => index);
	return (
		<div className='flex flex-col flex-1 w-full gap-2 md:w-8/12'>
			{numbersArray.map((el) => (
				<div
					key={el}
					className='flex border-l-[6px] border-blue-500 bg-blue-300/50 px-2 py-1 dark:bg-blue-500 dark:bg-opacity-30 min-h-[3rem] h-20 w-full rounded-md animate-pulse'
					style={{
						animationDelay: `${el * 0.05}s`,
						animationDuration: '1s',
					}}
				/>
			))}
		</div>
	);
};

const LoaderRanked = () => {
	const numbersArray = Array.from({ length: 2 }, (_, index) => index);
	return (
		<div className='flex self-center w-full h-full max-w-sm gap-3 md:w-4/12 md:flex-col md:max-w-xs md:self-auto'>
			{numbersArray.map((el) => (
				<div
					key={el}
					className='flex h-32 flex-col items-center w-full px-4 py-2 rounded-lg md:items-stretch md:flex-row bg-zinc-300 dark:bg-slate-800  md:justify-between animate-pulse'
					style={{
						animationDelay: `${el * 0.05}s`,
						animationDuration: '1s',
					}}
				/>
			))}
		</div>
	);
};

const LoaderUser = () => {
	return (
		<div className='h-24 w-full rounded-lg px-3 py-2 md:h-36 md:py-[18px] z-[2] bg-zinc-300 dark:bg-slate-800 animate-pulse'>
			<div className='flex self-center w-full h-full gap-5'>
				<div className='flex min-w-[5rem] flex-col items-center justify-center self-center md:block md:min-w-[6rem] relative h-[5rem] w-20 md:h-24 md:w-24 object-contain bg-zinc-100/60 dark:bg-slate-700/70 animate-pulse rounded-xl'>
					<div className='absolute w-full h-4 mx-auto my-0 -mt-3 text-center -bottom-1'>
						<span className='inline-block rounded-xl px-2 py-0 bg-zinc-100 dark:bg-slate-700/80 animate-pulse w-9 h-4 ' />
					</div>
				</div>
				<div className='flex flex-col justify-between w-full gap-1'>
					<div className='flex items-center gap-1 '>
						<span className='inline-block rounded-xl px-2 py-0 bg-zinc-200 dark:bg-slate-700/70 animate-pulse w-16 h-4 ' />
						<span className='inline-block rounded-xl px-2 py-0 bg-zinc-200 dark:bg-slate-700/70 animate-pulse w-16 h-4 ' />
					</div>
					<div className='bg-zinc-200 dark:bg-slate-700/70 animate-pulse w-16 h-6 rounded-md ' />
					<div className='bg-zinc-200 dark:bg-slate-700/70 animate-pulse w-20 h-6 rounded-md ' />
				</div>
			</div>
		</div>
	);
};

export default Profile;
