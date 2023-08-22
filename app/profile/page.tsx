import { Ranked, User, History } from '@/components';

const Profile = () => {
	return (
		<main className='container'>
			<article className='relative mt-4 profile__container'>
				<User />
				<div className='flex flex-col md:flex-row w-full gap-4 px-2 sm:px-3 z-[1]'>
					<Ranked />
					<History />
				</div>
			</article>
		</main>
	);
};

export default Profile;
