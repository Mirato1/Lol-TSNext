import { seasonElo } from '@/constants';
import { handleData } from '@/utils';
import CustomButton from '../CustomButton';
import { SummonerData } from '@/types';

const fetchUser = async (): Promise<SummonerData> => {
	const url = `https://la2.api.riotgames.com/lol/summoner/v4/summoners/${process.env.SUMMONER}?api_key=${process.env.API_KEY}`;

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
			<div className='absolute top-0  h-96 w-full'>
				<div className='relative h-full w-full'>
					<div
						className='bg-img sticky h-full w-full'
						style={{
							backgroundPosition: '50% -50px',
						}}
					/>
					<div className='gradient-bg absolute top-0 h-full w-full' />
				</div>
			</div>
			<div className='h-24 w-full rounded-lg px-3 py-2 md:h-36 md:py-[18px] z-[1] '>
				<div className='flex h-full w-full gap-5 self-center '>
					<div className='flex min-w-[5rem] flex-col items-center justify-center self-center md:block md:min-w-[6rem] '>
						<img
							src={`${process.env.API_URL}${process.env.API_PATCH}/img/profileicon/${profileIconId}.png`}
							className='h-[5rem] w-[5rem] rounded-xl shadow shadow-red-600 dark:shadow-cyan-600 md:h-24 md:w-24 '
							alt='Icono'
						/>
						<div className='-mt-3 h-5 text-center'>
							<span className='inline-block rounded-xl   bg-red-900 px-2 py-0 text-[0.5rem] text-zinc-50  dark:bg-slate-700 md:text-xs '>
								{summonerLevel || '999'}
							</span>
						</div>
					</div>
					<div className='flex w-full flex-col justify-between gap-1'>
						<div className='flex flex-wrap gap-1 md:gap-2 '>
							{seasonElo
								.map((el) => (
									<div key={el.season}>
										<div className='h-auto text-center'>
											<span className='flex gap-1 rounded-md bg-red-900 px-1 py-[0.5px] text-[0.5rem] font-medium text-zinc-50 dark:bg-slate-700  md:px-2 md:text-xs md:font-semibold '>
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
