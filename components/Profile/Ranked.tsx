import { RankData } from '@/types';
import { handleData } from '@/utils';

const fetchRanked = async (): Promise<RankData[]> => {
	const url = `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${process.env.SUMMONER}?api_key=${process.env.API_KEY}`;

	const { IsError, Data } = await handleData({ url });

	if (IsError) {
		throw new Error('Error obteniendo los datos del usuario');
	}

	return Data as RankData[];
};

export async function Ranked() {
	const data: RankData[] = await fetchRanked();
	const arr = Object.values(data);

	return (
		<div className='flex flex-col gap-3 z-[1]'>
			{!arr || arr.length === 0 ? (
				<>
					{Array(2)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className='flex w-full justify-between min-w-[8rem] max-w-[8rem] items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 dark:bg-slate-500 dark:bg-opacity-20 md:min-w-[15rem] md:max-w-[15rem] md:items-stretch lg:min-w-[20rem] lg:max-w-xs'
							>
								<div className='text-[0.5rem] font-bold md:text-[0.6rem] lg:text-sm '>
									{i === 0 ? 'Ranked Solo' : 'Ranked Flex'}
								</div>
								<div className='text-[0.5rem] font-medium md:text-[0.6rem] lg:text-sm opacity-90 dark:opacity-70 '>
									Unranked
								</div>
							</div>
						))}
				</>
			) : (
				<>
					{arr.map((el) => (
						<RankCard data={el} key={el.queueType} />
					))}
				</>
			)}
		</div>
	);
}

const RankCard = ({ data }: { data: RankData }) => (
	<div className='flex w-full min-w-[8rem] max-w-[8rem] flex-col items-center gap-2 rounded-lg bg-gray-300 px-4 py-2 dark:bg-gray-500 dark:bg-opacity-20 md:min-w-[15rem] md:max-w-[15rem] md:items-stretch lg:min-w-[20rem]  lg:max-w-xs'>
		<div className='border-b-[1px] border-gray-400 text-[0.5rem] font-medium text-gray-600 dark:border-gray-500 dark:text-gray-100 md:text-[0.6rem] lg:text-sm '>
			{data.queueType === 'RANKED_SOLO_5x5' ? 'Clasificatoria en solitario' : 'Clasificatoria Flexible'}
		</div>

		<div className='flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between'>
			<div className='h-[48px] w-[48px] min-w-[48px] rounded-full bg-gray-400  dark:bg-gray-500 dark:bg-opacity-30 lg:h-[72px] lg:w-[72px]  lg:min-w-[72px]'>
				<img
					style={{ objectPosition: '0px 5px' }}
					src={
						data.tier === 'GRANDMASTER'
							? '/grandmaster.webp'
							: data.tier === 'CHALLENGER'
							? '/challenger.webp'
							: '/diamond.webp'
					}
				/>
			</div>

			<div className='flex w-full flex-col items-center md:items-start '>
				<p
					className={`text-[.6rem] font-semibold md:text-xs lg:text-sm  ${
						data.tier === 'GRANDMASTER'
							? 'text-red-500'
							: data.tier === 'CHALLENGER'
							? 'text-yellow-500'
							: 'text-cyan-600'
					}`}
				>
					{data.tier || 'CHALLENGER'} {data.tier !== 'GRANDMASTER' && data.tier !== 'CHALLENGER' && data.rank}
				</p>
				<p className=' text-[0.5rem] font-medium text-cyan-500 dark:text-yellow-400 md:text-[0.6rem] lg:text-sm '>
					{data.leaguePoints || 0}LP
				</p>
			</div>

			<div className='flex min-w-fit flex-col items-end'>
				<div className='flex gap-2'>
					<p className='text-[0.5rem] font-medium text-green-600 md:text-[0.6rem] lg:text-sm '>{data.wins}V</p>
					<p className='text-[0.5rem] font-medium text-red-600  md:text-[0.6rem] lg:text-sm'>{data.losses}L</p>
				</div>
				<div>
					<p className='text-[0.5rem] text-gray-600 dark:text-gray-100 md:text-[0.6rem] lg:text-xs'>
						Winrate {((data.wins / (data.losses + data.wins)) * 100).toFixed(0)} %
					</p>
				</div>
			</div>
		</div>
	</div>
);
