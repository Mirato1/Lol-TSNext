import { RankData } from '@/types';
import { handleData } from '@/utils';

const fetchRanked = async (): Promise<RankData[]> => {
	const url = `https://${process.env.SV_1}/lol/league/v4/entries/by-summoner/${process.env.SUMMONER_BR}?api_key=${process.env.API_KEY_LIMITED}`;
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
		<div className='flex w-full md:w-4/12 md:flex-col gap-3 h-full max-w-sm md:max-w-xs self-center md:self-auto z-[1]'>
			{[...Array(Math.max(2, arr ? arr.length : 0))].map((_, i) =>
				!arr || arr.length === 0 || i >= arr.length ? (
					<div
						key={i}
						className='flex flex-col h-auto items-center md:items-stretch md:flex-row px-4 py-2 bg-zinc-100 dark:bg-slate-500 dark:bg-opacity-20 rounded-lg md:h-full w-full md:justify-between'
					>
						<div className='text-sm font-bold lg:text-base border-b-[1px] border-zinc-400 dark:border-slate-500 md:border-none'>
							{i === 0 ? 'Ranked Solo' : 'Ranked Flex'}
						</div>
						<div className='text-xs font-medium md:text-sm opacity-90 dark:opacity-70'>Unranked</div>
					</div>
				) : (
					<RankCard data={arr[i]} key={arr[i].queueType} />
				),
			)}
		</div>
	);
}

const RankCard = ({ data }: { data: RankData }) => (
	<div className='flex w-full md:items-stretch flex-col items-center gap-2  rounded-lg bg-zinc-100 px-4 py-2 dark:bg-slate-500 dark:bg-opacity-20 h-full justify-between'>
		<div className='border-b-[1px] font-bold border-zinc-400 text-sm text-slate-600 dark:border-slate-500 dark:text-zinc-100 lg:text-base '>
			{data.queueType === 'RANKED_SOLO_5x5' ? 'Ranked Solo' : 'Ranked Flex'}
		</div>

		<div className='flex flex-col items-center gap-2 md:flex-row md:items-center '>
			<div className='rounded-full bg-zinc-300 dark:bg-slate-500 dark:bg-opacity-30 md:max-w-[65px] lg:md:max-w-[85px] '>
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

			<div className='flex w-full flex-col items-center md:items-start md:flex-1 '>
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
				<p className=' text-xs font-medium text-cyan-500 dark:text-yellow-400 md:text-xs lg:text-sm '>
					{data.leaguePoints || 0}LP
				</p>
			</div>

			<div className='flex min-w-fit flex-col items-center md:items-end md:flex-1'>
				<div className='flex flex-col items-center'>
					<p className='text-xs text-slate-600 dark:text-zinc-100 md:text-xs lg:text-sm'>
						<b>WR</b> {((data.wins / (data.losses + data.wins)) * 100).toFixed(0)} %
					</p>
					<div className='flex gap-2'>
						<p className='text-xs font-medium text-green-600 md:text-xs lg:text-sm '>{data.wins}V</p>
						<p className='text-xs font-medium text-red-600  md:text-xs lg:text-sm'>{data.losses}L</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);
