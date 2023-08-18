import { seasonElo } from '@/constants';
import { handleData } from '@/utils';
import { SummonerData } from '@/types';
import { CustomButton } from '..';
import Image from 'next/image';

const fetchUser = async (): Promise<SummonerData> => {
	const url = `https://${process.env.SV_1}/lol/summoner/v4/summoners/${process.env.SUMMONER}?api_key=${process.env.API_KEY}`;
	const { IsError, Data } = await handleData({ url });
	if (IsError) {
		throw new Error('Error obteniendo los datos del usuario');
	}

	return Data as SummonerData;
};

export async function User() {
	const { name, profileIconId, summonerLevel } = await fetchUser();

	return (
		<>
			<div className='absolute top-0 w-full h-96'>
				<div className='relative w-full h-full'>
					<div
						className='sticky w-full h-full bg-img'
						style={{
							backgroundPosition: '50% -50px',
						}}
					/>
					<div className='absolute top-0 w-full h-full gradient-bg' />
				</div>
			</div>
			<div className='h-24 w-full rounded-lg px-3 py-2 md:h-36 md:py-[18px] z-[1] '>
				<div className='flex self-center w-full h-full gap-5 '>
					<div className='flex min-w-[5rem] flex-col items-center justify-center self-center md:block md:min-w-[6rem] relative h-[5rem] w-20 md:h-24 md:w-24 object-contain'>
						<Image
							src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/profileicon/${profileIconId}.png`}
							alt='profile-icon'
							priority
							sizes='100vw'
							fill
							className='object-contain w-full h-auto shadow rounded-xl shadow-red-600 dark:shadow-cyan-600 '
						/>
						<div className='absolute w-full h-4 mx-auto my-0 -mt-3 text-center -bottom-1'>
							<span className='inline-block rounded-xl bg-red-700 px-2 py-0 text-[0.5rem] text-zinc-50  dark:bg-cyan-600 md:text-xs'>
								{summonerLevel || '999'}
							</span>
						</div>
					</div>
					<div className='flex flex-col justify-between w-full gap-1'>
						<div className='flex flex-wrap gap-1 md:gap-2 '>
							{seasonElo
								.map((el) => (
									<div key={el.season}>
										<div className='h-auto text-center'>
											<span className='flex gap-1 rounded-md bg-red-700 px-1 py-[0.5px] text-[0.5rem] font-medium text-zinc-50 dark:bg-cyan-600  md:px-2 md:text-xs md:font-semibold '>
												<p>S{el.season}</p>
												<p>{el.elo}</p>
											</span>
										</div>
									</div>
								))
								.reverse()}
						</div>
						<h2 className='text-base font-semibold md:text-2xl'>{name || 'Mirato'}</h2>

						<CustomButton
							title='Actualizar'
							textStyles='text-zinc-50 text-[10px] md:text-[14px] leading-[17px] font-bold'
							containerStyles='self-start'
							// rightIcon='/right-arrow.svg'
							// handleClick={() => setIsOpen(true)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default User;
