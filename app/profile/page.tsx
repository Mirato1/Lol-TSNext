import { Ranked, User } from '@/components';

const Profile = () => {
	return (
		<main className='container'>
			<article className='profile__container relative mt-4'>
				<User />
				<div className='flex w-full gap-3'>
					<Ranked />
					{/* <History /> */}
				</div>
			</article>
		</main>
	);
};

export default Profile;
