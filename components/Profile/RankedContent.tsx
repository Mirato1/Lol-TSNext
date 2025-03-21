'use client';
import { tierColor } from '@/constants';
import { RankData } from '@/types';
import { fetchData } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const fetchRanked = async (): Promise<RankData[]> => {
	const url = `https://${process.env.NEXT_PUBLIC_SV_1}/lol/league/v4/entries/by-summoner/${process.env.NEXT_PUBLIC_SUMMONER}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

	return await fetchData({ url });
};

export default function RankedContent() {
	const { data } = useQuery({
		queryKey: ['ranked'],
		queryFn: fetchRanked,
	});

	if (!data) {
		return <h1 className='font-bold'>Loading...</h1>;
	}

	const arr = Object.values(data);

	return (
		<div className='flex self-center w-full h-full max-w-sm gap-3 md:w-4/12 md:flex-col md:max-w-xs md:self-auto'>
			{[...Array(Math.max(2, arr ? arr.length : 0))].map((_, i) =>
				!arr || arr.length === 0 || i >= arr.length ? (
					<div
						key={i}
						className='flex flex-col items-center w-full h-auto px-4 py-2 rounded-lg md:items-stretch md:flex-row bg-zinc-100 dark:bg-slate-500 dark:bg-opacity-20 md:h-full md:justify-between'
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
	<div className='flex flex-col items-center justify-between w-full h-full gap-2 px-4 py-2 rounded-lg md:items-stretch bg-zinc-100 dark:bg-slate-500 dark:bg-opacity-20'>
		<div className='border-b-[1px] font-bold border-zinc-400 text-sm text-slate-600 dark:border-slate-500 dark:text-zinc-100 lg:text-base '>
			{data.queueType === 'RANKED_SOLO_5x5' ? 'Ranked Solo' : 'Ranked Flex'}
		</div>

		<div className='flex flex-col items-center gap-2 md:flex-row md:items-center '>
			<div className='relative flex-shrink-0 w-20 h-20 rounded-full bg-zinc-300 dark:bg-slate-500 dark:bg-opacity-30 md:w-16 md:h-16 lg:w-20 lg:h-20'>
				<Image src={`/${data?.tier?.toLowerCase()}.webp`} alt='tier-icon' priority sizes='100vw' fill />
			</div>

			<div className='flex flex-col items-center w-full md:items-start '>
				<p className={`text-sm font-semibold lg:text-base ${tierColor[data.tier] || tierColor.default}`}>
					{data.tier || 'CHALLENGER'} {data.tier !== 'GRANDMASTER' && data.tier !== 'CHALLENGER' && data.rank}
				</p>
				<p className='text-xs font-medium md:text-xs'>{data.leaguePoints || 0}LP</p>
			</div>

			<div className='flex flex-col items-center md:items-end md:min-w-[55px]'>
				<div className='flex flex-col items-center'>
					<p className='text-xs text-slate-600 dark:text-zinc-100 md:text-xs lg:text-sm'>
						WR {((data.wins / (data.losses + data.wins)) * 100).toFixed(0)}%
					</p>
					<div className='flex gap-2'>
						<p className='text-xs font-medium text-green-600 md:text-xs lg:text-sm '>{data.wins}V</p>
						<p className='text-xs font-medium text-red-600 md:text-xs lg:text-sm'>{data.losses}L</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);
