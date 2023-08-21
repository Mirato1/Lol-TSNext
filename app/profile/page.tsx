import { Ranked, User, History } from '@/components';

const Profile = () => {
	return (
		<main className='container'>
			<article className='relative mt-4 profile__container'>
				<User />
				<div className='flex flex-col md:flex-row w-full gap-4 px-0 sm:px-3 z-[1]'>
					<Ranked />
					<History />
				</div>
			</article>
		</main>
	);
};

const LoaderHistory = () => {
	const numbersArray = Array.from({ length: 20 }, (_, index) => index);
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

export default Profile;
